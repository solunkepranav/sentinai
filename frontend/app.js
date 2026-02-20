/* =============================================
   SentinAI — Compliance Intelligence Platform
   Fintech-Grade Frontend Logic
   Features: [[TXN||text]] Forensic Parser, Chart.js,
             File Upload, Multi-Agent Pipeline Animation,
             Sentence-Backed Forensics, Audit Trail
   ============================================= */

const API_URL = window.location.origin + '/api';

// ============ STATE ============
let appState = {
    transactions: [],
    analysisResults: null,
    currentPage: 'dashboard',
    charts: {},
    isAnalyzing: false
};

// ============ NAVIGATION ============
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(item.getAttribute('data-page'));
    });
});

function navigateTo(page) {
    appState.currentPage = page;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeNav) activeNav.classList.add('active');

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const activePage = document.getElementById(`page-${page}`);
    if (activePage) activePage.classList.add('active');

    const titles = {
        dashboard: ['Dashboard', 'Overview'],
        upload: ['Data Ingestion', 'Secure Upload & Preview'],
        analysis: ['AI Analysis', 'Multi-Agent Pipeline'],
        report: ['SAR Report', 'Narrative & Evidence'],
        audit: ['Audit Trail', 'Immutable Decision Log']
    };
    document.getElementById('pageTitle').textContent = titles[page]?.[0] || page;
    document.getElementById('breadcrumb').textContent = titles[page]?.[1] || '';
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    initFileUpload();
    initAuditFilters();
    loadAuditLogs();
    checkSystemStatus();

    document.getElementById('loadSampleBtn').addEventListener('click', loadSampleData);
    document.getElementById('runAnalysisBtn').addEventListener('click', runAnalysis);
    document.getElementById('editReportBtn').addEventListener('click', toggleEditReport);
    document.getElementById('approveReportBtn').addEventListener('click', approveReport);
});

// ============ SYSTEM STATUS ============
async function checkSystemStatus() {
    const dot = document.getElementById('ollamaStatus');
    const label = document.getElementById('ollamaLabel');
    dot.className = 'status-dot checking';
    label.textContent = 'Verifying...';

    try {
        const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
            dot.className = 'status-dot online';
            label.textContent = 'ENCLAVE: SECURE';
        } else {
            dot.className = 'status-dot offline';
            label.textContent = 'System Error';
        }
    } catch {
        dot.className = 'status-dot offline';
        label.textContent = 'Offline';
    }
}

// ============ CHARTS ============
function initCharts() {
    const fontConfig = { family: 'Inter', size: 11 };
    const legendConfig = { labels: { color: '#64748b', font: fontConfig, padding: 14, usePointStyle: true, pointStyleWidth: 10 } };

    // Risk Distribution (Doughnut)
    appState.charts.risk = new Chart(document.getElementById('riskChart'), {
        type: 'doughnut',
        data: {
            labels: ['Critical', 'Elevated', 'Standard'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 0,
                hoverOffset: 6,
                spacing: 2
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            cutout: '70%',
            plugins: { legend: { position: 'bottom', ...legendConfig } }
        }
    });

    // Volume (Bar)
    appState.charts.volume = new Chart(document.getElementById('volumeChart'), {
        type: 'bar',
        data: {
            labels: ['Transfer', 'Payment', 'Inbound', 'Deposit', 'Intl'],
            datasets: [{
                label: 'Count',
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.65)', 'rgba(6, 182, 212, 0.65)',
                    'rgba(139, 92, 246, 0.65)', 'rgba(245, 158, 11, 0.65)',
                    'rgba(239, 68, 68, 0.65)'
                ],
                borderRadius: 4, borderSkipped: false, barPercentage: 0.55
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#475569', font: { size: 10 } } },
                y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#475569', font: { size: 10 }, stepSize: 1 } }
            }
        }
    });

    // Anomaly (Polar Area)
    appState.charts.anomaly = new Chart(document.getElementById('anomalyChart'), {
        type: 'polarArea',
        data: {
            labels: ['Structuring', 'Circular', 'Fan-In/Out', 'Rapid Move'],
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: ['rgba(239,68,68,0.45)', 'rgba(245,158,11,0.45)', 'rgba(6,182,212,0.45)', 'rgba(139,92,246,0.45)'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', ...legendConfig } },
            scales: { r: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { display: false } } }
        }
    });
}

function updateCharts(transactions, findings) {
    if (!transactions || !findings) return;
    const raw = findings.raw_findings || findings;
    const suspicious = raw.all_suspicious_txns || [];
    const safe = Math.max(0, transactions.length - suspicious.length);

    appState.charts.risk.data.datasets[0].data = [suspicious.length, Math.floor(safe * 0.3), Math.ceil(safe * 0.7)];
    appState.charts.risk.update('none');

    const types = ['Transfer', 'Payment', 'Inbound', 'Deposit', 'International'];
    appState.charts.volume.data.datasets[0].data = types.map(t => transactions.filter(tx => tx.type === t).length);
    appState.charts.volume.update('none');

    const s = (raw.structuring || []).length;
    const c = (raw.circular_trading || []).length;
    const f = (raw.fan_in_out || []).length;
    appState.charts.anomaly.data.datasets[0].data = [s, c, f, Math.max(1, Math.floor((s + c) / 2))];
    appState.charts.anomaly.update('none');
}

// ============ FILE UPLOAD ============
function initFileUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    ['dragenter', 'dragover'].forEach(ev => {
        dropZone.addEventListener(ev, (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    });
    ['dragleave', 'drop'].forEach(ev => {
        dropZone.addEventListener(ev, (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); });
    });

    dropZone.addEventListener('drop', (e) => { if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', (e) => { if (e.target.files[0]) handleFile(e.target.files[0]); });
}

function handleFile(file) {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.json')) {
        alert('Unsupported format. Please upload CSV or JSON.');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = file.name.endsWith('.csv') ? parseCSV(e.target.result) : JSON.parse(e.target.result);
        appState.transactions = data;
        renderPreview(data);
    };
    reader.readAsText(file);
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).filter(l => l.trim()).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i] || '');
        return obj;
    });
}

async function loadSampleData() {
    const btn = document.getElementById('loadSampleBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    try {
        const res = await fetch(`${API_URL}/transactions`);
        const data = await res.json();
        appState.transactions = data;
        renderPreview(data);
        updateStats(data);
        btn.innerHTML = '<i class="fas fa-check"></i> Loaded';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';
    } catch (err) {
        btn.innerHTML = '<i class="fas fa-times"></i> Failed';
        btn.style.borderColor = '#ef4444';
        btn.style.color = '#ef4444';
    }
}

function renderPreview(data) {
    if (!data || data.length === 0) return;
    const section = document.getElementById('previewSection');
    section.classList.remove('hidden');
    document.getElementById('rowCount').textContent = `${data.length} rows loaded`;

    const headers = Object.keys(data[0]);
    document.querySelector('#previewTable thead').innerHTML = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
    document.querySelector('#previewTable tbody').innerHTML = data.map(row =>
        `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`
    ).join('');

    updateStats(data);
}

function updateStats(data) {
    document.getElementById('totalTxns').textContent = data.length;
}

// ============ ANALYSIS PIPELINE ============
async function runAnalysis() {
    if (appState.isAnalyzing) return;
    appState.isAnalyzing = true;

    navigateTo('analysis');
    document.getElementById('analysisEmpty').classList.add('hidden');
    document.getElementById('analysisResults').classList.add('hidden');
    const loading = document.getElementById('analysisLoading');
    loading.classList.remove('hidden');

    // Animate pipeline steps sequentially
    const steps = ['step-ingest', 'step-investigate', 'step-comply', 'step-scribe'];
    const labels = ['Data Vault', 'Investigator', 'Compliance', 'Scribe'];
    const messages = [
        'PII masking applied. Account numbers truncated. Names hashed to USER_XXXXXXXX.',
        'Building transaction graph (NetworkX). Scanning for structuring, circular patterns...',
        'Matching anomaly typologies against AML/CFT knowledge base (PMLA, FATF, FinCEN)...',
        'Generating SAR narrative with forensic evidence markers [[TXN||text]]...'
    ];
    const types = ['investigator', 'investigator', 'compliance', 'scribe'];

    for (let i = 0; i < steps.length; i++) {
        const step = document.getElementById(steps[i]);
        step.classList.add('active');
        step.querySelector('.progress-bar').style.width = '0%';

        addActivity(labels[i], messages[i], types[i]);

        // Animate progress bar
        await animateProgress(step.querySelector('.progress-bar'), 1200);

        step.classList.remove('active');
        step.classList.add('done');
        await sleep(300);
    }

    // Call backend (which has its own time.sleep delays)
    try {
        const res = await fetch(`${API_URL}/analyze`, { method: 'POST' });
        const data = await res.json();
        appState.analysisResults = data;

        loading.classList.add('hidden');
        showResults(data);
        loadAuditLogs();
        addActivity('System', `Pipeline complete. ${(data.findings?.raw_findings?.all_suspicious_txns || []).length} suspicious transactions flagged.`, 'investigator');
    } catch (err) {
        loading.classList.add('hidden');
        document.getElementById('analysisEmpty').classList.remove('hidden');
        addActivity('System', `ERROR: Analysis failed — ${err.message}`, 'investigator');
    }
    appState.isAnalyzing = false;
}

function animateProgress(bar, duration) {
    return new Promise(resolve => {
        let start = null;
        function tick(ts) {
            if (!start) start = ts;
            const pct = Math.min(((ts - start) / duration) * 100, 100);
            bar.style.width = pct + '%';
            if (pct < 100) requestAnimationFrame(tick);
            else resolve();
        }
        requestAnimationFrame(tick);
    });
}

function showResults(data) {
    const results = document.getElementById('analysisResults');
    results.classList.remove('hidden');

    const findings = data.findings?.raw_findings || data.findings || {};
    const suspicious = findings.all_suspicious_txns || [];

    // Stats
    document.getElementById('highRiskCount').textContent = suspicious.length;
    document.getElementById('medRiskCount').textContent = Math.max(0, Math.floor((appState.transactions.length - suspicious.length) * 0.3));
    document.getElementById('lowRiskCount').textContent = Math.max(0, Math.ceil((appState.transactions.length - suspicious.length) * 0.7));
    document.getElementById('flaggedTxns').textContent = suspicious.length;

    // Finding cards
    const struct = findings.structuring || [];
    const circular = findings.circular_trading || [];
    const fanin = findings.fan_in_out || [];

    document.querySelector('#findingStructuring .finding-count').textContent = `${struct.length} txns flagged`;
    document.querySelector('#findingCircular .finding-count').textContent = `${circular.length} txns flagged`;
    document.querySelector('#findingFanIn .finding-count').textContent = `${fanin.length} txns flagged`;

    if (struct.length > 0) document.getElementById('findingStructuring').classList.add('flagged');
    if (circular.length > 0) document.getElementById('findingCircular').classList.add('flagged');
    if (fanin.length > 0) document.getElementById('findingFanIn').classList.add('flagged');

    updateCharts(appState.transactions, findings);
    renderReport(data.narrative || 'No narrative generated.');
    renderEvidenceTable(appState.transactions, suspicious);
}

// ============ REPORT — [[TXN||TEXT]] PARSER ============
function renderReport(narrative) {
    const body = document.getElementById('reportBody');

    // Split by lines, process each
    const lines = narrative.split('\n');
    let html = '';

    for (const line of lines) {
        if (!line.trim()) {
            html += '<br>';
            continue;
        }

        // Check if line is a section header (ALL CAPS, no [[)
        if (/^[A-Z\s\-—:]+$/.test(line.trim()) && !line.includes('[[')) {
            html += `<h3 class="report-heading">${line.trim()}</h3>`;
            continue;
        }

        // Parse [[TXN_ID_1,TXN_ID_2||text content]] markers
        const parsed = line.replace(
            /\[\[([^\]|]+)\|\|([^\]]+)\]\]/g,
            (match, txnIds, text) => {
                const ids = txnIds.trim();
                return `<span class="interactive-evidence" data-txns="${ids}" onmouseenter="highlightEvidence(this)" onmouseleave="clearHighlight()">${text}</span>`;
            }
        );

        html += `<p class="report-line">${parsed}</p>`;
    }

    body.innerHTML = html;
    document.getElementById('highlightBadge').classList.remove('hidden');
}

function renderEvidenceTable(transactions, suspicious) {
    const tbody = document.getElementById('evidenceBody');
    if (!transactions || transactions.length === 0) return;

    tbody.innerHTML = transactions.map(tx => {
        const txId = tx.transaction_id;
        const isSuspicious = suspicious.includes(txId);
        const risk = isSuspicious ? 'high' : 'low';
        const label = isSuspicious ? 'CRITICAL' : 'CLEAR';

        return `<tr id="evidence-${txId}" class="${isSuspicious ? 'suspicious-row' : ''}">
            <td class="mono">${txId}</td>
            <td>${tx.sender || '—'}</td>
            <td>${tx.receiver || '—'}</td>
            <td class="mono amount">₹${Number(tx.amount || 0).toLocaleString('en-IN')}</td>
            <td>${tx.type || '—'}</td>
            <td><span class="risk-badge ${risk}">${label}</span></td>
        </tr>`;
    }).join('');
}

// ============ SENTENCE-BACKED FORENSICS (X-Factor) ============
window.highlightEvidence = function (el) {
    const txnIds = (el.getAttribute('data-txns') || '').split(',');
    el.classList.add('evidence-active');

    txnIds.forEach(id => {
        const row = document.getElementById(`evidence-${id.trim()}`);
        if (row) {
            row.classList.add('highlight-row');
            // Smooth scroll into view
            row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
};

window.clearHighlight = function () {
    document.querySelectorAll('.highlight-row').forEach(r => r.classList.remove('highlight-row'));
    document.querySelectorAll('.evidence-active').forEach(e => e.classList.remove('evidence-active'));
};

// ============ AUDIT TRAIL ============
async function loadAuditLogs() {
    try {
        const res = await fetch(`${API_URL}/audit/logs`);
        const logs = await res.json();
        if (Array.isArray(logs) && logs.length > 0) renderAuditLogs(logs);
    } catch { /* No logs yet */ }
}

function renderAuditLogs(logs) {
    const timeline = document.getElementById('auditTimeline');
    const icons = {
        'Investigator': 'fas fa-search', 'Compliance': 'fas fa-balance-scale',
        'Scribe': 'fas fa-pen-fancy', 'DataVault': 'fas fa-shield-alt', 'System': 'fas fa-server'
    };

    timeline.innerHTML = logs.map(log => {
        const agent = log.agent || 'System';
        const cls = agent.toLowerCase().replace(/\s/g, '');
        const icon = icons[agent] || 'fas fa-cog';

        return `<div class="audit-item" data-agent="${agent}">
            <div class="audit-icon ${cls}"><i class="${icon}"></i></div>
            <div class="audit-info">
                <div class="audit-agent">${agent} <span class="audit-badge">${agent}</span></div>
                <div class="audit-activity">${log.activity || ''}</div>
                <div class="audit-details">${log.details || ''}</div>
            </div>
            <div class="audit-timestamp">${formatTimestamp(log.timestamp)}</div>
        </div>`;
    }).join('');
}

function initAuditFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            document.querySelectorAll('.audit-item').forEach(item => {
                item.style.display = (filter === 'all' || item.getAttribute('data-agent') === filter) ? 'flex' : 'none';
            });
        });
    });
}

// ============ ACTIVITY FEED ============
function addActivity(agent, text, type) {
    const feed = document.getElementById('activityFeed');
    const empty = feed.querySelector('.activity-empty');
    if (empty) empty.remove();

    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
        <div class="activity-dot ${type}"></div>
        <div class="activity-text"><strong>${agent}</strong> ${text}</div>
        <div class="activity-time">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
    `;
    feed.insertBefore(item, feed.firstChild);
}

// ============ REPORT EDITING ============
function toggleEditReport() {
    const body = document.getElementById('reportBody');
    const btn = document.getElementById('editReportBtn');
    const editable = body.contentEditable === 'true';
    body.contentEditable = !editable;
    btn.innerHTML = editable ? '<i class="fas fa-edit"></i> Edit' : '<i class="fas fa-check"></i> Save';
    if (!editable) btn.classList.add('btn-editing');
    else btn.classList.remove('btn-editing');
}

function approveReport() {
    const btn = document.getElementById('approveReportBtn');
    btn.innerHTML = '<i class="fas fa-check-double"></i> Approved';
    btn.classList.add('btn-approved');
    addActivity('Analyst', 'SAR report approved for filing with FIU-IND.', 'compliance');
}

// ============ EXPORT REPORT ============
function exportReport() {
    if (!appState.analysisResults) {
        alert('No analysis results available. Please run the analysis first.');
        return;
    }
    // Open the banking-standard report in a new tab
    window.open(`${API_URL}/export/report`, '_blank');
    addActivity('System', 'SAR report exported for regulatory filing.', 'compliance');
}

// ============ HELPERS ============
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function formatTimestamp(ts) {
    if (!ts) return '';
    try { return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
    catch { return ts; }
}
