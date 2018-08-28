FROM mysql:5.7
RUN mkdir -p /docker-entrypoint-initdb.d
COPY ubyssey.sql /docker-entrypoint-initdb.d/
# RUN apt-get update && apt-get -y install build-essential curl
# RUN echo "create database ubyssey" | mysql --user=root --password=ubyssey
# RUN ccurl https://storage.googleapis.com/ubyssey/dropbox/ubyssey.sql | mysql --user=root --password=ubyssey
