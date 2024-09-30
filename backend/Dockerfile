# Use official Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install development dependencies
RUN npm install --save-dev ts-node nodemon

# Copy source code
COPY . .

# Expose the port
EXPOSE 5001

# Start the server with nodemon for hot reloading
CMD ["npm", "run", "dev"]
