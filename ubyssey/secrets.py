from google.cloud import datastore

class Secrets():
    client = datastore.Client('ubyssey-prd-flex')

    def get(self, key):
        query = self.client.query(kind='secrets')
        secrets = list(query.fetch())
        for secret in secrets:
            if secret['key'] == key:
                return secret['value']
        return "FAILED_TO_LOAD_FROM_GCS"
