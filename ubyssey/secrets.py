# from google.appengine.ext import ndb

# class Secrets(ndb.Model):
#     key = ndb.StringProperty()
#     value = ndb.StringProperty()

#     @staticmethod
#     def get(key):
#         PLACEHOLDER_VALUE = 'NOT SET'

#         result = Secrets.query(Secrets.key == key).get()

#         if not result:
#             result = Secrets()
#             result.key = key
#             result.value = PLACEHOLDER_VALUE
#             result.put()

#         if result.value == PLACEHOLDER_VALUE:
#             raise Exception('Secret %s not defined in the Secrets database.' % key)

#         return result.value

# Imports the Google Cloud client library
from google.cloud import datastore

# Instantiates a client
client = datastore.Client('ubyssey-prd-flex')

def get(key):
    query = client.query(kind='Task', key=key)
    print(query)
    return query

get('GS_ACCESS_KEY_ID')