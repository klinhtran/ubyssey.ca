import sys
import json

from ubyssey import settings

with open('ubyssey/static/package.json') as f:
    data = json.load(f)
    if settings.VERSION != data['version']:
        print('wrong version')
        sys.exit(1)
    else:
        print('version ok')
