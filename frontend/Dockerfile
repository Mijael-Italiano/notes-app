FROM node:20-alpine

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose Vite development server port
EXPOSE 5173

# Run Vite in development mode and bind to all network interfaces
CMD ["npm", "run", "dev", "--", "--host"]