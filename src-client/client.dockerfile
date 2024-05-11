
FROM node:14 as build-stage

WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


RUN npm run build


FROM nginx:latest


COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]