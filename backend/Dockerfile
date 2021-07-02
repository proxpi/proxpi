FROM node:alpine
WORKDIR /app
COPY ./package.json /app
COPY . .
EXPOSE 8080
RUN npm install
CMD ["npm","start"]