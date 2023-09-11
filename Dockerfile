# Utiliza la imagen oficial de Node.js como base
FROM node:14

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install && npm install mongoose

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Instala el Azure-Cli
RUN apt-get update && apt-get install -y \
    curl zip 
CMD /bin/bash
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Inicia la app
CMD ["node", "app.js"]
