FROM node:20-alpine

WORKDIR /app

# Copiamos package.json primero para aprovechar cache
COPY package.json package-lock.json ./

RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# Ejecutamos Vite en modo dev y lo exponemos a la red
CMD ["npm", "run", "dev", "--", "--host"]