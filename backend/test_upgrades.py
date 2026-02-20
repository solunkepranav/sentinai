"""Quick test for all SentinAI code upgrades."""
import sys
sys.path.insert(0, '.')

from modules.pii_masking import PIIMasker
from modules.anomaly_detector import AnomalyDetector
from agents.compliance import ComplianceAgent
from agents.writer import ScribeAgent
import pandas as pd
import json

print('=' * 60)
print('  SentinAI Code Upgrade Test Suite')
print('=' * 60)

# Test 1: PII Masking uses SHA-256
print('\n--- Test 1: PII Masking (SHA-256) ---')
m = PIIMasker()
masked = m.mask_name('John Doe')
print(f'  John Doe -> {masked}')
masked2 = m.mask_name('Alice Smith')
print(f'  Alice Smith -> {masked2}')
masked_acc = m.mask_account('ACC_82910')
print(f'  ACC_82910 -> {masked_acc}')
assert masked.startswith('USER_'), f'Expected USER_ prefix, got {masked}'
print('  PASS')

# Test 2: Dataset size
print('\n--- Test 2: Dataset Size ---')
df = pd.read_csv('data/sample_transactions.csv')
print(f'  Rows: {len(df)}')
print(f'  Unique senders: {df["sender"].nunique()}')
print(f'  Unique receivers: {df["receiver"].nunique()}')
assert len(df) >= 50, f'Expected >=50 rows, got {len(df)}'
print('  PASS')

# Test 3: AML Laws count
print('\n--- Test 3: AML Laws Knowledge Base ---')
with open('data/aml_laws.json') as f:
    laws = json.load(f)
print(f'  Laws loaded: {len(laws)}')
assert len(laws) >= 12, f'Expected >=12 laws, got {len(laws)}'
print('  PASS')

# Test 4: Anomaly Detector finds all 4 types
print('\n--- Test 4: Anomaly Detection (4 types) ---')
detector = AnomalyDetector('data/sample_transactions.csv')
results = detector.run_all_checks()
for k, v in results.items():
    print(f'  {k}: {len(v)} txns')
assert len(results['structuring']) > 0, 'Structuring should find anomalies'
assert len(results['circular_trading']) > 0, 'Circular trading should find anomalies'
assert len(results['fan_in_out']) > 0, 'Fan-in/out should find anomalies'
assert len(results['velocity']) > 0, 'Velocity should find anomalies'
print('  PASS')

# Test 5: Compliance maps all types including velocity
print('\n--- Test 5: Compliance Mapping (with velocity) ---')
comp = ComplianceAgent()
report = comp.analyze_findings(results)
for typology, matched_laws in report.items():
    top_law = matched_laws[0] if matched_laws else {}
    section = top_law.get('section', 'N/A')
    title = top_law.get('title', 'N/A')
    score = top_law.get('relevance_score', 0)
    print(f'  {typology}: {section} - {title} (score: {score})')
assert 'rapid_movement' in report, 'Should have rapid_movement mapping'
print('  PASS')

# Test 6: SAR Narrative includes velocity section
print('\n--- Test 6: SAR Narrative (velocity section) ---')
scribe = ScribeAgent()
findings = {'raw_findings': results, 'summary': 'test'}
narrative = scribe.generate_narrative('test', findings=findings)
has_velocity = 'Velocity' in narrative or 'Rapid' in narrative
print(f'  Narrative length: {len(narrative)} chars')
print(f'  Forensic markers: {narrative.count("[[")}, links')
print(f'  Has velocity section: {has_velocity}')
assert has_velocity, 'Narrative should mention velocity'
print('  PASS')

print('\n' + '=' * 60)
print('  ALL 6 TESTS PASSED')
print('=' * 60)
