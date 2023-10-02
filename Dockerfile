# Utiliza la imagen oficial de Node.js como base
FROM node:14-alpine

# Directorio de trabajo dentro del contenedor
# Etapa de construcción
FROM node:14 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
CMD [ "executable" ]
RUN npm install && npm install mongoose
COPY . .
RUN npm cache clean --force

# Expone el puerto en el que la aplicación escucha
# Etapa de producción
FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]

