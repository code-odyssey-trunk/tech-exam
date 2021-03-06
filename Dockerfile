# Dockerfile

FROM node:12-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY userbook/ .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "pm2" ]