# This Dockerfile should be moved to a directory containing both ubyssey.ca and dispatch repos
# FROM directive instructing base image to build upon
# This docker image runs on Debian Jessie, a popular linux distro
FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
&& apt-get -y install build-essential curl \
&& apt-get -y install vim\ 
&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
&& apt-get install -y nodejs \
&& nodejs -v \
&& npm -v

# method for accessing specific branch
RUN git clone https://github.com/ubyssey/ubyssey.ca.git && cd ubyssey.ca && git fetch && git checkout 407-python-3
RUN git clone https://github.com/ubyssey/dispatch.git && cd dispatch && git fetch && git checkout 407-python-3
WORKDIR ./ubyssey.ca/
RUN pip install -r requirements-prd.txt -t lib/ \
&& pip install requests --upgrade -t lib/ \
&& apt-get install -qq libexempi3 \
&& cp _settings/settings-prd.py ubyssey/settings.py
WORKDIR ./ubyssey/static
RUN npm install && npm install -g gulp && npm rebuild node-sass && gulp build
CMD ["gulp"]
WORKDIR ./../../../
WORKDIR ./dispatch/
RUN pip install -e .[dev] && python setup.py develop
WORKDIR ./dispatch/static/manager
RUN npm install -g yarn && yarn setup
WORKDIR ./../../../../ubyssey.ca/

CMD gunicorn -b :$PORT --pythonpath '/ubyssey' ubyssey.wsgi
