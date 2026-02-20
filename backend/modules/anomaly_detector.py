"""
SentinAI Anomaly Detector — Statistical + Graph-Based Pattern Detection
Uses Pandas for statistical analysis and NetworkX for graph-based detection.
"""

import pandas as pd
import networkx as nx
from datetime import timedelta


class AnomalyDetector:
    def __init__(self, data_path: str):
        self.df = pd.read_csv(data_path)
        self.df['timestamp'] = pd.to_datetime(self.df['timestamp'])
        self.graph = self._build_graph()

    def _build_graph(self):
        G = nx.DiGraph()
        for _, row in self.df.iterrows():
            G.add_edge(
                row['sender'], row['receiver'],
                weight=row['amount'],
                txn_id=row['transaction_id'],
                timestamp=row['timestamp']
            )
        return G

    def detect_structuring(self, threshold=1000000, window_days=7):
        """
        Detect multiple transactions just below reporting threshold from same sender.
        Classic structuring: many transfers < ₹10L but total > ₹10L within a time window.
        """
        suspicious_txns = []
        sender_groups = self.df.groupby('sender')

        for sender, group in sender_groups:
            # Filter transactions below threshold
            below_threshold = group[group['amount'] < threshold]
            if len(below_threshold) < 3:
                continue

            total_sent = below_threshold['amount'].sum()
            if total_sent > threshold:
                suspicious_txns.extend(below_threshold['transaction_id'].tolist())

        return list(set(suspicious_txns))

    def detect_circular_trading(self):
        """
        Detect cycles in the transaction graph (A → B → C → A).
        Uses NetworkX simple_cycles for cycle detection.
        """
        try:
            cycles = list(nx.simple_cycles(self.graph))
            relevant_cycles = [c for c in cycles if len(c) > 2]

            cycle_txns = []
            for cycle in relevant_cycles:
                for i in range(len(cycle)):
                    u = cycle[i]
                    v = cycle[(i + 1) % len(cycle)]
                    edge_data = self.graph.get_edge_data(u, v)
                    if edge_data:
                        cycle_txns.append(edge_data.get('txn_id'))
            return list(set(cycle_txns))
        except Exception:
            return []

    def detect_fan_in_out(self, degree_threshold=4):
        """
        Fan-in: Many accounts sending to one (smurfing pattern).
        Fan-out: One account sending to many (distribution pattern).
        """
        suspicious_txns = []

        in_degrees = dict(self.graph.in_degree())
        out_degrees = dict(self.graph.out_degree())

        for node, degree in in_degrees.items():
            if degree >= degree_threshold:
                target_txns = self.df[self.df['receiver'] == node]['transaction_id'].tolist()
                suspicious_txns.extend(target_txns)

        for node, degree in out_degrees.items():
            if degree >= degree_threshold:
                target_txns = self.df[self.df['sender'] == node]['transaction_id'].tolist()
                suspicious_txns.extend(target_txns)

        return list(set(suspicious_txns))

    def detect_velocity(self, max_gap_minutes=30, min_count=3):
        """
        Detect rapid-fire transaction sequences: same sender making 3+ transfers
        within a short time window (e.g. 30 minutes).
        """
        suspicious_txns = []
        sender_groups = self.df.sort_values('timestamp').groupby('sender')

        for sender, group in sender_groups:
            if len(group) < min_count:
                continue

            timestamps = group['timestamp'].tolist()
            txn_ids = group['transaction_id'].tolist()

            # Sliding window: check if min_count transactions fall within max_gap_minutes
            for i in range(len(timestamps)):
                window_txns = [txn_ids[i]]
                for j in range(i + 1, len(timestamps)):
                    gap = (timestamps[j] - timestamps[i]).total_seconds() / 60
                    if gap <= max_gap_minutes:
                        window_txns.append(txn_ids[j])
                    else:
                        break

                if len(window_txns) >= min_count:
                    suspicious_txns.extend(window_txns)

        return list(set(suspicious_txns))

    def run_all_checks(self):
        """Execute all anomaly detection algorithms and return consolidated results."""
        structuring = self.detect_structuring()
        circular = self.detect_circular_trading()
        fan_in_out = self.detect_fan_in_out()
        velocity = self.detect_velocity()

        all_suspicious = list(set(structuring + circular + fan_in_out + velocity))

        results = {
            "structuring": structuring,
            "circular_trading": circular,
            "fan_in_out": fan_in_out,
            "velocity": velocity,
            "all_suspicious_txns": all_suspicious
        }
        return results


if __name__ == "__main__":
    detector = AnomalyDetector("../data/sample_transactions.csv")
    results = detector.run_all_checks()
    for k, v in results.items():
        print(f"{k}: {len(v)} txns → {v}")
