import os

# from ubyssey.secrets import Secrets

from dispatch.default_settings import *

BASE_URL = 'https://www.ubyssey-prd-flex.appspot.com/'
CANONICAL_DOMAIN = 'www.ubyssey-prd-flex.appspot.com'

SECRET_KEY = '&t7b#38ncrab5lmpe#pe#41coa-8ctwuy@tm0!x8*n_r38x_m*'
NOTIFICATION_KEY = "Mp2OSApC5ZQ11iHtKfTfAWycrr-YYl9yphpkeqKIy9E"

# SECRET_KEY = Secrets.get('SECRET_KEY')
# NOTIFICATION_KEY = Secrets.get('NOTIFICATION_KEY')

VERSION = '1.4.54'

ALLOWED_HOSTS = [
    'ubyssey.ca',
    'www.ubyssey.ca',
    'ubyssey-prd-flex.appspot.com',
    'www.ubyssey-prd-flex.appspot.com'
]

INSTALLED_APPS += [
    'ubyssey',
    'ubyssey.events',
]

ROOT_URLCONF = 'ubyssey.urls'

USE_TZ = True

TIME_ZONE = 'America/Vancouver'

################# STANDARD ##################
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'HOST': Secrets.get('SQL_HOST'),
#         'NAME': Secrets.get('SQL_DATABASE'),
#         'USER': Secrets.get('SQL_USER'),
#         'PASSWORD': Secrets.get('SQL_PASSWORD'),
#         'PORT': 3306,
#     }
# }

################## FLEX ######################
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ubyssey_flex',
        'USER': 'root',
        'PASSWORD': 'ubyssey',
        'HOST': '/cloudsql/ubyssey-prd-flex:us-central1:ubyssey-prd-flex',
        'PORT': '3306',
    },
}
###############################################

TEMPLATES += [
    {
        'NAME': 'ubyssey',
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(os.path.dirname(__file__), 'templates'),
        ]
    }
]

###################### STANDARD ########################

# MEMCACHE IS NOT AVAILABLE ON GAE FLEX ENVIRONMENT
# We will use default database sessions for now, If caching is necessary
# look into redis

# SESSION_ENGINE = 'gae_backends.sessions.cached_db'
# CACHES = {
#     'default': {
#         'BACKEND': 'gae_backends.memcache.MemcacheCache',
#     }
# }

###################################################

MIDDLEWARE += [
    'canonical_domain.middleware.CanonicalDomainMiddleware',
]


###################### STANDARD ########################
# # GCS File Storage
# DEFAULT_FILE_STORAGE = 'django_google_storage.storage.GoogleStorage'

# GS_ACCESS_KEY_ID = Secrets.get('GS_ACCESS_KEY_ID')
# GS_SECRET_ACCESS_KEY = Secrets.get('GS_SECRET_ACCESS_KEY')
# GS_STORAGE_BUCKET_NAME = 'ubyssey'
# GS_LOCATION = 'media'
# GS_USE_SIGNED_URLS = True

####################### FLEX ###########################
# STATIC_ROOT = os.path.join(os.path.dirname(__file__), 'static/gcs')
STATIC_URL = 'https://storage.googleapis.com/ubyssey-prd-flex/static/'
MEDIA_URL = 'https://storage.googleapis.com/ubyssey-prd-flex/media/'

# GCS File Storage
DEFAULT_FILE_STORAGE = 'django_google_storage.storage.GoogleStorage'


GS_ACCESS_KEY_ID = 'GOOGIEHS55PVL5M3FUVYGR2Z'
GS_SECRET_ACCESS_KEY = 'RkEjoaROiwRIjP0blYUxKIV1nQlnlgUVzcSOPpJw'
GS_STORAGE_BUCKET_NAME = 'ubyssey-prd-flex'
GS_LOCATION = 'media'
GS_USE_SIGNED_URLS = True

# # DEFAULT_FILE_STORAGE = 'django_gcloud_storage.DjangoGCloudStorage'

# # GCS_PROJECT = "ubyssey-prd-flex"
# # GCS_BUCKET = "ubyssey-prd-flex"
# # GCS_CREDENTIALS_FILE_PATH = "client-secret.json"

#############################################################
dirname = os.path.dirname
STATIC_ROOT = os.path.join(dirname(dirname(__file__)), 'static/gcs')

STATICFILES_DIRS += (
    os.path.join(dirname(dirname(__file__)), 'static/dist'),
)

# STATIC_URL = '/static/'
# MEDIA_URL = '/media/'


# STATIC_URL = 'https://ubyssey.storage.googleapis.com/static/'
# MEDIA_URL = 'https://ubyssey.storage.googleapis.com/media/'

# # Facebook
# FACEBOOK_CLIENT_ID = Secrets.get('FACEBOOK_CLIENT_ID')
# FACEBOOK_CLIENT_SECRET = Secrets.get('FACEBOOK_CLIENT_SECRET')

# EMAIL_HOST = Secrets.get('EMAIL_HOST')
# EMAIL_PORT = 465
# EMAIL_HOST_USER = Secrets.get('EMAIL_HOST_USER')
# EMAIL_HOST_PASSWORD = Secrets.get('EMAIL_HOST_PASSWORD')
# EMAIL_USE_SSL = True

# UBYSSEY_ADVERTISING_EMAIL = Secrets.get('UBYSSEY_ADVERTISING_EMAIL')

# Use in-memory file handler on Google App Engine
FILE_UPLOAD_HANDLERS = ['django.core.files.uploadhandler.MemoryFileUploadHandler',]
FILE_UPLOAD_MAX_MEMORY_SIZE = 25621440

# MEDIA_ROOT = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'media')

# FACEBOOK_CLIENT_ID = ''
# FACEBOOK_CLIENT_SECRET = ''

# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 465
# EMAIL_HOST_USER = 'rowan@ubyssey.ca'
# EMAIL_HOST_PASSWORD = ''
# EMAIL_USE_SSL = True

# UBYSSEY_ADVERTISING_EMAIL = ''
