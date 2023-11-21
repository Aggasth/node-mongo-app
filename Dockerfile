# Etapa de construcción
FROM node:14 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
CMD [ "executable" ]
RUN npm install && npm install mongoose
COPY . .
RUN npm cache clean --force

# Etapa de producción
FROM node:14-alpine as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]


