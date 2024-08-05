# Use the official Node.js image as the base image, use npm
FROM node:20-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# Use a minimal web server to serve the static files
# https://www.knowledgehut.com/blog/web-development/how-to-dockerize-react-app#what-is-a-docker-image?%C2%A0
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build .

# Start the Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Steps:
    # Create .dockerignore and add /node_modules into it
        # add the .dockerignore file to .gitignore
    # Create this dockerfile and add the lines above - nginx is simply a webserver
    # Create the docker-compose.yml file
    # Make sure to include the environment variables file, as well as the port mapping to 80
        # Ensure that the environment variables are set up correctly
    # Run docker-compose -f docker-compose.yml up -d - this will start the container and run the app
    # Done!