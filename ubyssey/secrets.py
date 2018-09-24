from google.cloud import datastore

# class Secrets():
client = datastore.Client.from_service_account_json('../ubyssey-prd-flex-secret.json')

def get(key):
    query = client.query(kind='secrets')
    secrets = list(query.fetch())
    for secret in secrets:
        if secret['key'] == key:
            return secret['value']
    return "FAILED_TO_LOAD_FROM_GCS"
