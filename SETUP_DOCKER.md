# Docker setup
*Note: the following setup was done on an ubunutu linux computer.*

first install docker 18.06.x and docker-compose 1.10.x. 

Follow the instructions here. This will require you to create a docker account if you do not already have one.
https://docs.docker.com/

*If setting up on linux, all docker and docker-compose commands should be preceeded with sudo.*se

cd into the ubyssey.ca directory and run the following command
```bash
docker-compose up
```

This will setup your dev docker containers. To see currently running docker containers, run the following command in a different terminal.
```bash
docker ps
```

#### The following should be done in a separate terminal

Connect to the ubyssey_db docker container.
```bash
sudo docker exec -t -i ubyssey_db bash
```

Setup the local database in ubyssey_db docker container. When prompted enter *ubyssey* as the password
```bash
mysql -u root -p 
create database ubyssey
quit
```

Populate the database container with dummy articles.
```bash
apt update
apt-get install curl
```
  When you run this command, you may not be prompted for the password. Simply type in ubyssey and press enter to allow curl to populate the database with the extern ubyssey.sql data.
```bash
curl https://storage.googleapis.com/ubyssey/dropbox/ubyssey.sql | mysql -u root ubyssey -p
```

#### If you need to perform and django migrations on the docker container

Connect to the ubyssey-dev docker container
```bash
sudo docker exec -t -i ubyssey-dev bash
```

Proceed to perform any django migration tasks as usual e.g.
```bash
python manage.py showmigrations
```
Once the database has been populated, and migrations have been applied,
you should be able to proceed to localhost:8000 and localhost:8000/admin
to view ubyssey.ca and dispatch running from your ubyssey-dev docker container.
