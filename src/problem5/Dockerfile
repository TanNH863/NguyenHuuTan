# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3063

# Set default command
CMD ["node", "dist/index.js"]
