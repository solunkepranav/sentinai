
import logging
from modules.anomaly_detector import AnomalyDetector

class InvestigatorAgent:
    def __init__(self, data_path):
        self.detector = AnomalyDetector(data_path)
    
    def run_investigation(self):
        logging.info("Investigator Agent starting analysis...")
        findings = self.detector.run_all_checks()
        
        # Add narrative context for Scribe
        enhanced_findings = {
            "raw_findings": findings,
            "summary": f"Detected {len(findings.get('all_suspicious_txns', []))} suspicious transactions. "
                       f"Structuring: {len(findings.get('structuring', []))}, "
                       f"Circular: {len(findings.get('circular_trading', []))}, "
                       f"Fan-In/Out: {len(findings.get('fan_in_out', []))}, "
                       f"Velocity: {len(findings.get('velocity', []))}."
        }
        return enhanced_findings
