# Use the official Node.js image as the base image
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


# Use a minimal web server to serve the static files
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build .

EXPOSE 80

# Start the Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
