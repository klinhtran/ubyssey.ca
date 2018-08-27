install docker
install docker-compose

run sudo docker-compose up
run sudo docker-compose run django
run sudo docker-compose up

to connect to the docker container
run sudo docker ps to see all container ids

run sudo docker exec -t -i <id ofca_dajngo image> ubyssey bash

proceed to perform any migrations as usuall e.g. python manage.py showmigrations