# stage 1
FROM node:alpine AS angular-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build
# RUN npm install && npm run build

# stage 2
FROM nginx:alpine
COPY --from=angular-app-build /app/dist/my-first-app /usr/share/nginx/html
EXPOSE 80