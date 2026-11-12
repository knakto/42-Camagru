NAME			:= camagru
COMPOSE		:= docker compose

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

test:
	php -S localhost:3000 -t backend/srcs

.PHONY: all up down stop start restart logs clean fclean re
