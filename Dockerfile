# stage1 : building the app
FROM node:latest as builder 
WORKDIR /app
# copy all the files with the same place as the Dockerfile (that's why .) in the docker image and it will be inside the folder /app
COPY . .

RUN npm cache clean --force

# install the node modules 
RUN npm install -g npm

ENV NODE_OPTIONS="--openssl-legacy-provider"
# generate the dist folder wich contain all deployable packages 
RUN npm run build --prod
# RUN ls /app/dist
# stage 2 : running the app, and debugging it
FROM nginx:alpine 
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder  /app/dist/record-rtc-screen-demo usr/share/nginx/html
# copy this folder /app/dist/angular-app into this usr/share/nginx/html wich is the default folder used by nginx images in order to host the angular application 
EXPOSE 80
