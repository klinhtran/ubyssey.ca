# Dockerfile
# FROM directive instructing base image to build upon
# This docker image runs on Debian Jessie, a popular linux distro
FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update
 && apt-get -y install build-essential curl vim
 && curl -sL https://deb.nodesource.com/setup_6.x | bash -
 && apt-get install -y nodejs
 && nodejs -v && npm -v
 && git clone https://github.com/ubyssey/ubyssey.ca.git
 && git clone https://github.com/ubyssey/dispatch.git

WORKDIR ./ubyssey.ca/

RUN pip install -r requirements.txt
 && cp _settings/settings-local.py ubyssey/settings.py

WORKDIR ./ubyssey/static

RUN npm install
 && npm install -g gulp yarn
 && npm rebuild node-sass
 && gulp build-dev

CMD ["gulp"]

WORKDIR ./../../../
WORKDIR ./dispatch/

RUN pip install -e .[dev]
&& python setup.py develop

WORKDIR ./dispatch/static/manager

RUN ls
RUN yarn setup
WORKDIR ./../../../../ubyssey.ca/
