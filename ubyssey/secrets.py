import os
from google.cloud import datastore
import settings

# abs_path = os.path.dirname(os.path.dirname(__file__))
# json_keyfile_path = os.path.join(abs_path, 'ubyssey-prd-flex-secret.json')
client = datastore.Client.from_service_account_json(settings.GCS_CREDENTIALS_FILE)

def get(key):
    query = client.query(kind='secrets')
    secrets = list(query.fetch())
    for secret in secrets:
        if secret['key'] == key:
            return secret['value']
    return "FAILED_TO_LOAD_FROM_GCS"
