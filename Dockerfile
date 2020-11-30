FROM node:14-buster

WORKDIR /app
EXPOSE 4000

COPY node_modules /app/node_modules/
COPY package*.json /app/
COPY build /app/

CMD ["npm", "start"]
