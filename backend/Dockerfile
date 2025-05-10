# Use official Node.js LTS image as the base
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build TypeScript (if tsconfig.json exists)
RUN if [ -f tsconfig.json ]; then npx tsc; fi

# Expose the gateway port (default 4000)
EXPOSE 4000

# Set environment variables (can be overridden at runtime)
ENV NODE_ENV=production

# Start the API gateway (change entrypoint if needed)
CMD [ "npx", "ts-node", "src/gateway.ts" ]
