from google.cloud import datastore

class Secrets():
    client = datastore.Client('ubyssey-prd-flex')

    @staticmethod
    def get(client, key):
        query = client.query(kind='secrets')
        secrets = list(query.fetch())
        for secret in secrets:
            if secret['key'] == key:
                return secret['value']
        return query
