FROM node:27.0.0-alpha.0.1.0-alpine3.23 AS build

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY index.html index.html
COPY public/ public
COPY src/ src

RUN npm run build

#======================================================

FROM nginx:1.31.8-alpine AS deploy

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
