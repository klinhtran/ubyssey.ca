import os
from google.cloud import datastore
import settings

class Secrets:
    @staticmethod
    def get(key):
        json_keyfile_path = os.path.join(settings.GCS_CREDENTIALS_FILE)
        client = datastore.Client.from_service_account_json(json_keyfile_path)
        query = client.query(kind='secrets')
        secrets = list(query.fetch())
        for secret in secrets:
            if secret['key'] == key:
                return secret['value']
        return "FAILED_TO_LOAD_FROM_GCS"
