# Dockerfile

# FROM directive instructing base image to build upon
FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN nodejs -v && npm -v
RUN git clone https://github.com/ubyssey/ubyssey.ca.git
RUN git clone https://github.com/ubyssey/dispatch.git
WORKDIR ./ubyssey.ca/
RUN pip install -r requirements.txt
RUN cp _settings/settings-local.py ubyssey/settings.py
WORKDIR ./ubyssey/static
RUN npm install
RUN npm install -g gulp
RUN npm rebuild node-sass
RUN gulp build-dev
CMD ["gulp"]
WORKDIR ./../../../
WORKDIR ./dispatch/
RUN pip install -e .[dev]
RUN python setup.py develop
WORKDIR ./dispatch/static/manager
RUN ls
RUN npm install -g yarn
RUN yarn setup
WORKDIR ./../../../../ubyssey.ca/
