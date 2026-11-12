FROM nginx:1.31.8-alpine

WORKDIR /etc/nginx
COPY nginx.conf conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 8443
ENTRYPOINT ["/entrypoint.sh"]
