# Dockerfile

FROM node:12-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "run", "pm2" ]