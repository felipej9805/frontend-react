# Utiliza una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY . .

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Construye la aplicación React
RUN npm run build

# Define una variable de entorno
ENV REACT_APP_API_KEY=https://api.example.com

# Expone el puerto 8080 para la aplicación React
EXPOSE 8080

# Comando para iniciar la aplicación en el puerto 8080
CMD ["npm", "start"]
