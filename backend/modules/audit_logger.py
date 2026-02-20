
import sqlite3
import datetime
import logging

class AuditLogger:
    def __init__(self, db_path='backend/audit.db'):
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Create Audit Table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS audit_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    agent_name TEXT,
                    activity TEXT,
                    details TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            conn.commit()
            conn.close()
        except sqlite3.Error as e:
            logging.error(f"Error initializing audit DB: {e}")

    def log_decision(self, agent_name, activity, details):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            cursor.execute('''
                INSERT INTO audit_logs (agent_name, activity, details, timestamp)
                VALUES (?, ?, ?, ?)
            ''', (agent_name, activity, details, timestamp))
            
            conn.commit()
            conn.close()
            logging.info(f"Audit logged: {agent_name} - {activity}")
        except sqlite3.Error as e:
            logging.error(f"Failed to log audit entry: {e}")

    def get_logs(self, limit=50):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM audit_logs ORDER BY timestamp DESC LIMIT ?", (limit,))
            logs = cursor.fetchall()
            conn.close()
            return logs
        except sqlite3.Error as e:
            logging.error(f"Failed to retrieve audit logs: {e}")
            return []
