
from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from agents.orchestrator import Orchestrator
from modules.audit_logger import AuditLogger
from modules.report_exporter import ReportExporter
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize orchestrator
orchestrator = Orchestrator(data_path="data/sample_transactions.csv")

# Store last analysis results for export
_last_results = {}

@router.get("/health")
def health_check():
    return {"status": "ok", "service": "sentinai-backend"}

@router.post("/analyze")
def run_full_analysis():
    global _last_results
    logging.info("Triggering full analysis pipeline...")
    try:
        results = orchestrator.run_pipeline()
        _last_results = results
        return results
    except Exception as e:
        logger.error(f"Analysis failed: {e}")
        return {"error": str(e), "status": "failed"}

@router.get("/audit/logs")
def get_audit_trail():
    try:
        logs = orchestrator.audit_logger.get_logs()
        formatted_logs = [
            {"id": log[0], "agent": log[1], "activity": log[2], "details": log[3], "timestamp": log[4]}
            for log in logs
        ]
        return formatted_logs
    except Exception as e:
        logger.error(f"Failed to fetch logs: {e}")
        return {"error": str(e)}

@router.get("/transactions")
def get_transactions():
    try:
        import pandas as pd
        df = pd.read_csv(orchestrator.data_path)
        masked_df = orchestrator.masker.process_dataframe(df)
        return masked_df.to_dict(orient="records")
    except Exception as e:
        logger.error(f"Failed to fetch transactions: {e}")
        return {"error": str(e)}

@router.get("/export/report", response_class=HTMLResponse)
def export_sar_report():
    """Generate a printable, banking-standard SAR report as HTML."""
    global _last_results
    try:
        if not _last_results:
            return HTMLResponse(
                content="<html><body><h1>No analysis results available</h1><p>Please run the analysis pipeline first.</p></body></html>",
                status_code=200
            )

        # Get transaction data for the table
        import pandas as pd
        df = pd.read_csv(orchestrator.data_path)
        masked_df = orchestrator.masker.process_dataframe(df)
        transactions = masked_df.to_dict(orient="records")

        # Get audit logs
        raw_logs = orchestrator.audit_logger.get_logs()
        audit_logs = [
            {"id": log[0], "agent": log[1], "activity": log[2], "details": log[3], "timestamp": log[4]}
            for log in raw_logs
        ]

        # Generate report
        report_html = ReportExporter.generate_html_report(
            narrative=_last_results.get("narrative", ""),
            findings=_last_results.get("findings", {}),
            compliance=_last_results.get("compliance", {}),
            transactions=transactions,
            audit_logs=audit_logs
        )

        return HTMLResponse(content=report_html, status_code=200)

    except Exception as e:
        logger.error(f"Export failed: {e}")
        return HTMLResponse(
            content=f"<html><body><h1>Export Error</h1><p>{str(e)}</p></body></html>",
            status_code=500
        )
