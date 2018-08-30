# This Dockerfile should be moved to a directory containing both ubyssey.ca and dispatch repos
# FROM directive instructing base image to build upon
# This docker image runs on Debian Jessie, a popular linux distro
FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install build-essential curl && apt-get -y install vim 
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN nodejs -v && npm -v
# method for accessing specific branch
# RUN git clone https://github.com/ubyssey/ubyssey.ca.git && cd ubyssey.ca && git fetch && git checkout 407-python-3
# RUN git clone https://github.com/ubyssey/dispatch.git && cd dispatch && git fetch && git checkout 407-python-3
COPY ./ubyssey.ca ./ubyssey.ca
WORKDIR ./ubyssey.ca/
RUN ls
RUN pip install -r requirements.txt
RUN cp _settings/settings-local.py ubyssey/settings.py
WORKDIR ./ubyssey/static
RUN npm install
RUN npm install -g gulp
RUN npm rebuild node-sass
RUN gulp build-dev
CMD ["gulp"]
WORKDIR ./../../../
COPY ./dispatch ./dispatch
WORKDIR ./dispatch/
RUN ls
RUN pip install -e .[dev]
RUN python setup.py develop
WORKDIR ./dispatch/static/manager
RUN npm install -g yarn
RUN yarn setup
WORKDIR ./../../../../ubyssey.ca/
RUN ls