docker-compose --file compose-dev.yml up -d helloworldone
docker exec --interactive --tty $(docker-compose --file compose-dev.yml ps -q helloworldone) bash
