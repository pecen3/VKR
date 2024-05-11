FROM node:21


WORKDIR /app


COPY package*.json ./


RUN npm ci


COPY . .


RUN npm run build


EXPOSE 7000


CMD ["npm", "start"]