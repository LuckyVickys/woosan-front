# Stage 1: Build React app
FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 로그 추가
RUN echo "Listing /etc/nginx/conf.d after copying nginx.conf:"
RUN ls -al /etc/nginx/conf.d/
RUN echo "Displaying contents of /etc/nginx/conf.d/default.conf:"
RUN cat /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
