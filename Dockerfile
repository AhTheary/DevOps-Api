# stage1 as builder
FROM node:14-alpine as builder

WORKDIR /backend

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Build the project
# RUN pm2 start index.js


# FROM nginx:alpine as production-build
# COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
# COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3001
ENTRYPOINT ["nodemone", "index.js"]
