# Dockerfile

# FROM directive instructing base image to build upon
FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN nodejs -v && npm -v
WORKDIR /ubyssey.ca
ADD requirements.txt /ubyssey.ca/
RUN pip install -r requirements.txt
ADD . /ubyssey.ca/
RUN cp _settings/settings-local.py ubyssey/settings.py
WORKDIR ./ubyssey/static
RUN npm install
RUN npm install -g gulp
RUN gulp build-dev
WORKDIR ./../../
