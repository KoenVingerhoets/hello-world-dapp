docker-compose up -d helloworldone
docker exec --interactive --tty $(docker-compose ps -q helloworldone) bash
