FROM node:18
WORKDIR /app
COPY shared ./shared
COPY services/users-service/package*.json ./
RUN npm install
COPY services/users-service/. .
CMD ["npm", "start"]


