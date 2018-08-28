# Docker setup

install docker
install docker-compose

*if linux user, all docker and docker-compose commands should be preceeded with sudo.*

###### docker-compose up

*to see currently running docker containers*
###### docker ps

#### the following should be done in a separate terminal

*to connect to the ubyssey_db docker container*
  ###### sudo docker exec -t -i ubyssey_db bash

*to setup the local database in ubyssey_db docker container*
  ###### mysql -u root -p ubyssey
  ###### create database ubyssey
  ###### quit

*to setup the local database in ubyssey_db docker container*
  ###### apt update
  ###### apt-get install curl
  ###### curl https://storage.googleapis.com/ubyssey/dropbox/ubyssey.sql | mysql -u root ubyssey -p ubyssey

*to connect to the ubyssey-dev docker container*
  ###### sudo docker ps to see all container ids
  ###### sudo docker exec -t -i ubyssey-dev bash

*proceed to perform any migrations as usuall e.g.* 
    ###### python manage.py showmigrations

Once the database has been populated, and migrations have been applied,
you should be able to proceed to localhost:8000 and localhost:8000/admin
to view ubyssey.ca and dispatch running from your ubyssey-dev docker container.