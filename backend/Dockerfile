FROM php:8.3.36-fpm-alpine3.23

WORKDIR /var/www/html
COPY srcs/ .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 9000
ENTRYPOINT ["/entrypoint.sh"]
