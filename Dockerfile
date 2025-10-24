FROM node:18-alpine AS build

#RUN mkdir -p /app && chown -R node:node /app

WORKDIR /app 

COPY package*.json ./

#USER node 

#COPY --chown=node:node package*.json ./

RUN npm ci 

#COPY --chown=node:node . .

COPY . .

RUN npm run build


FROM nginx:alpine

RUN apk update && apk upgrade --no-cache

RUN addgroup -S -g 10001 app \
    && adduser  -S -D -H -u 10001 -G app app \
    && mkdir -p /var/cache/nginx /var/run /var/log/nginx /tmp \
    && chown -R 10001:10001 /var/cache/nginx /var/run /var/log/nginx /etc/nginx /usr/share/nginx/html /tmp


COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

USER 10001:10001

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
