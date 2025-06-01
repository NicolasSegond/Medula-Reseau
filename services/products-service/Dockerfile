FROM node:18
WORKDIR /app

# Copier uniquement package.json + package-lock.json pour npm install (cache les dépendances)
COPY services/products-service/package*.json ./

RUN npm install

COPY shared ./shared

COPY services/products-service/. .

# Installer nodemon globalement (ou via npx au lancement)
RUN npm install -g nodemon

CMD ["nodemon", "--legacy-watch", "index.js"]
