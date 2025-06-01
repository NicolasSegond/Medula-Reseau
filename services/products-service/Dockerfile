FROM node:18
WORKDIR /app
COPY shared ./shared
COPY services/products-service/package*.json ./
RUN npm install
COPY services/products-service/. .
CMD ["npm", "start"]


