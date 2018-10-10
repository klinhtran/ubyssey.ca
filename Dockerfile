# # This Dockerfile should be moved to a directory containing both ubyssey.ca and dispatch repos
# # FROM directive instructing base image to build upon
# # This docker image runs on Debian Jessie, a popular linux distro
# FROM python:3.6
# ENV PYTHONUNBUFFERED 1
# RUN export DEBIAN_FRONTEND=noninteractive
# RUN apt-get update \
# && apt-get -y install libssl-dev \
# && apt-get -y install python3-dev \ 
# && apt-get -y install default-libmysqlclient-dev \
# # && pip install -r requirements-prd.txt -t lib/ \
# # && pip install requests --upgrade -t lib/ \
# && apt-get install -qq libexempi3 \
# && apt-get -y install build-essential curl \
# && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
# && apt-get install -y nodejs 

# # method for accessing specific branch
# RUN git clone https://github.com/ubyssey/ubyssey.ca.git && cd ubyssey.ca && git fetch && git checkout 530-gae-flex
# RUN git clone https://github.com/ubyssey/dispatch.git && cd dispatch && git fetch && git checkout 530-gae-flex
# WORKDIR ./ubyssey.ca/
# RUN cp _settings/settings-prd.py ubyssey/settings.py \
# && mv requirements-prd.txt requirements.txt \
# && pip install -r requirements.txt \
# && pip install requests --upgrade 
# WORKDIR ./ubyssey/static
# RUN npm install && npm install -g gulp && npm rebuild node-sass
# WORKDIR ./../../../dispatch/
# RUN pip install -e . && python setup.py install
# WORKDIR ./dispatch/static/manager
# RUN npm install -g yarn && yarn setup
# WORKDIR ./../../../../ubyssey.ca/

# # EXPOSE 8000
# CMD gunicorn -b :$PORT --pythonpath '/ubyssey' ubyssey.wsgi

# # CMD ["gunicorn", "-b", "127.0.0.1:8000", "ubyssey:wsgi"]

# This dockerfile is used to deploy the ubyssey.ca site. 
# ANY CHANGES TO THIS FILE SHOULD BE TESTED THOROUGHLY BEFORE DEPLOYMENT!
# This docker image runs on Debian Jessie, a popular linux distro
FROM python:3.6
ENV PYTHONUNBUFFERED 1

WORKDIR /
RUN ls
RUN export DEBIAN_FRONTEND=noninteractive \
&& apt-get update \
&& apt-get -y install build-essential curl \
&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
&& apt-get install -y nodejs

RUN git clone https://github.com/ubyssey/ubyssey.ca.git
WORKDIR /ubyssey.ca/

RUN git fetch \
&& git checkout 530-gae-flex \
&& cp _settings/settings-prd.py ubyssey/settings.py \
&& mv requirements-prd.txt requirements.txt \
&& pip install -r requirements.txt

WORKDIR /ubyssey.ca/ubyssey/static
RUN npm install \
&& npm install -g gulp \
&& npm rebuild node-sass \
&& gulp build-dev
CMD ["gulp"]

# make a folder to temporarily hold staticfiles, so travis can copy them for upload to gcs
RUN mkdir gcs && ls

WORKDIR /ubyssey.ca/
RUN git clone https://github.com/ubyssey/dispatch.git
WORKDIR /ubyssey.ca/dispatch/
RUN  ls \
&& git fetch \
&& git checkout 530-gae-flex \
&& pip install -e .[dev] \
&& python setup.py develop

WORKDIR /ubyssey.ca/dispatch/dispatch/static/manager
RUN npm install -g yarn \
&& yarn setup \ 
&& yarn build

WORKDIR /ubyssey.ca/
# RUN ls && ls ubyssey/ && ls ubyssey/static/ && python manage.py collectstatic --noinput

CMD gunicorn -b :$PORT --pythonpath '/ubyssey' ubyssey.wsgi
