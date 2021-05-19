# # stage 1
# FROM node:alpine AS angular-app-build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build


# # stage 2
# FROM nginx:alpine
# COPY --from=angular-app-build /app/dist/my-first-app /usr/share/nginx/html
# EXPOSE 80



# Development

FROM node:14

ENV ANGULAR_APP_PATH /angular-app

RUN mkdir -p $ANGULAR_APP_PATH

WORKDIR $ANGULAR_APP_PATH

COPY package*.json ./

COPY . .

EXPOSE 4210

CMD ["npm", "run", "start:docker"]