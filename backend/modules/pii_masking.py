"""
SentinAI PII Masking Module — SHA-256 with Salt
Anonymizes personally identifiable information before it enters the AI pipeline.
"""

import hashlib
import os


class PIIMasker:
    def __init__(self, salt=None):
        # Use a fixed salt for consistent masking within a session
        # In production, this would come from a secure vault
        self._salt = salt or "SentinAI_PII_Salt_2026"

    def mask_name(self, name):
        """
        SHA-256 hash with salt → USER_XXXXXXXX pseudo-ID.
        Consistent: same name always produces the same masked ID within a session.
        """
        salted = f"{self._salt}:{name}"
        hash_object = hashlib.sha256(salted.encode('utf-8'))
        short_hash = hash_object.hexdigest()[:8]
        return f"USER_{short_hash.upper()}"

    def mask_account(self, account):
        """Mask all but last 4 characters of an account number."""
        account = str(account)
        if len(account) > 4:
            return "****" + account[-4:]
        return account

    def process_dataframe(self, df):
        """Apply PII masking to sender/receiver names and account numbers."""
        df_masked = df.copy()
        if 'sender' in df_masked.columns:
            df_masked['sender'] = df_masked['sender'].apply(self.mask_name)
        if 'receiver' in df_masked.columns:
            df_masked['receiver'] = df_masked['receiver'].apply(self.mask_name)
        if 'sender_account' in df_masked.columns:
            df_masked['sender_account'] = df_masked['sender_account'].apply(self.mask_account)
        if 'receiver_account' in df_masked.columns:
            df_masked['receiver_account'] = df_masked['receiver_account'].apply(self.mask_account)
        return df_masked
