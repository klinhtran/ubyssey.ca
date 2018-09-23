from google.cloud import datastore

# Instantiates a client
client = datastore.Client('ubyssey-prd-flex')

def get(client, key):
    query = client.query(kind='secrets')
    secrets = list(query.fetch())
    for secret in secrets:
        if secret['key'] == key:
            return secret['value']
    return 'Failed to find value in secrets'
