# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Git
RUN apk add --no-cache git

# Install dependencies
RUN npm i

# Copy the source code
COPY . .

# Define a build mode variable based on the branch
ARG BUILD_MODE
ARG API_ADDRESS

ENV VITE_API_ADDRESS=$API_ADDRESS

# RUN if [ "$BUILD_MODE" = "dev" ]; then npm run build:dev; else npm run build:main; fi
RUN npm run build:$BUILD_MODE

# Stage 2: Serve the production-ready app
FROM node:18-alpine

WORKDIR /app

# Install serve (or http-server)
RUN npm install -g serve

# Copy the built app from the previous stage (the 'build' directory) to the working directory
COPY --from=build /app/build .

# Expose port 80 (default for serve)
EXPOSE 80

# Start serve to serve the app
CMD ["serve", "-s", "-l", "80", "."]
