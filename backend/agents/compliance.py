"""
SentinAI Compliance Agent — Keyword-Weighted RAG for Regulatory Mapping
Maps detected anomalies to specific AML/CFT legal provisions using
TF-IDF-inspired relevance scoring against a structured knowledge base.
"""

import json
import logging
import math


class ComplianceAgent:
    def __init__(self, laws_path='data/aml_laws.json'):
        try:
            with open(laws_path, 'r') as f:
                self.laws = json.load(f)
        except FileNotFoundError:
            self.laws = []
            logging.warning(f"AML laws file not found at {laws_path}")

        # Pre-compute IDF-like weights (rarer keywords get higher weight)
        self._keyword_weights = self._compute_keyword_weights()

    def _compute_keyword_weights(self):
        """Compute inverse-document-frequency-style weights for keywords."""
        keyword_doc_count = {}
        total_laws = len(self.laws)

        for law in self.laws:
            seen = set()
            for kw in law.get('keywords', []):
                kw_lower = kw.lower()
                if kw_lower not in seen:
                    keyword_doc_count[kw_lower] = keyword_doc_count.get(kw_lower, 0) + 1
                    seen.add(kw_lower)

        weights = {}
        for kw, count in keyword_doc_count.items():
            # IDF = log(N / df), higher for rarer keywords
            weights[kw] = math.log((total_laws + 1) / (count + 1)) + 1.0
        return weights

    def find_relevant_laws(self, anomaly_type, keywords=None):
        """
        TF-IDF-inspired retrieval: matches anomaly type and optional keywords
        against the AML knowledge base with weighted scoring.
        """
        relevant_sections = []

        search_terms = [anomaly_type.lower()]
        if keywords:
            search_terms.extend([k.lower() for k in keywords])

        for law in self.laws:
            law_keywords = [k.lower() for k in law.get('keywords', [])]
            law_title = law['title'].lower()
            law_desc = law['description'].lower()

            # Weighted scoring: keyword matches + title matches + description matches
            score = 0.0
            matched_terms = []

            for term in search_terms:
                # Exact keyword match (highest weight)
                if term in law_keywords:
                    weight = self._keyword_weights.get(term, 1.0)
                    score += 2.0 * weight
                    matched_terms.append(term)

                # Title match (medium weight)
                if term in law_title:
                    score += 1.5
                    if term not in matched_terms:
                        matched_terms.append(term)

                # Description match (lower weight)
                if term in law_desc:
                    score += 1.0
                    if term not in matched_terms:
                        matched_terms.append(term)

                # Partial keyword match (fuzzy)
                for kw in law_keywords:
                    if term in kw or kw in term:
                        if kw not in matched_terms and term not in matched_terms:
                            score += 0.5

            if score > 0:
                relevant_sections.append({
                    "id": law['id'],
                    "title": law['title'],
                    "section": law['section'],
                    "description": law['description'],
                    "relevance_score": round(score, 2),
                    "matched_terms": matched_terms
                })

        # Sort by relevance score (descending)
        relevant_sections.sort(key=lambda x: x['relevance_score'], reverse=True)
        return relevant_sections[:5]  # Return top 5 matches

    def analyze_findings(self, findings):
        """Map all detected anomaly types to relevant regulations."""
        compliance_report = {}

        if findings.get('structuring'):
            compliance_report['structuring'] = self.find_relevant_laws(
                "structuring", ["below threshold", "CTR", "threshold evasion"]
            )

        if findings.get('circular_trading'):
            compliance_report['circular_trading'] = self.find_relevant_laws(
                "circular trading", ["layering", "round trip", "shell company"]
            )

        if findings.get('fan_in_out'):
            compliance_report['smurfing'] = self.find_relevant_laws(
                "smurfing", ["fan-in", "coordinated deposits", "smurf"]
            )

        if findings.get('velocity'):
            compliance_report['rapid_movement'] = self.find_relevant_laws(
                "velocity", ["rapid", "immediate transfer", "quick movement"]
            )

        return compliance_report
