NAME			:= camagru
COMPOSE		:= docker compose
PHP				:= php
SHELL 		:= /bin/bash


all: $(NAME)

$(NAME):up

up:
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down

stop:
	$(COMPOSE) stop

start:
	$(COMPOSE) start

restart: down up

logs:
	$(COMPOSE) logs -f

clean: down
	$(COMPOSE) down --rmi all -v

fclean: clean
	docker system prune -af --volumes

re: clean up

test: source_env
	$(PHP) -S localhost:3000 backend/api/index.php

source_env:
	set -a
	source .env
	set +a

.PHONY: all up down stop start restart logs clean fclean re source_env
