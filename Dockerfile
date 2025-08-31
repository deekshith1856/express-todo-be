# Use Node.js LTS version as the base image
FROM node:20-alpine

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
# These can be overridden when running the container
ENV PORT=3000
ENV NODE_ENV=production
# Note: MONGODB_URI should be provided when running the container
# as it will likely point to a different location than localhost

# Command to run the application
CMD ["node", "dist/index.js"]

