FROM node:18-alpine AS build

RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app 

USER node 

COPY --chown=node:node package*.json ./

RUN npm ci 

COPY --chown=node:node . .

RUN npm run build


FROM nginx:alpine

RUN addgroup -S app && adduser -S -G app app \
    && mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chown -R app:app /var/cache/nginx /var/run /var/log/nginx /etc/nginx /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

USER app

EXPOSE 80