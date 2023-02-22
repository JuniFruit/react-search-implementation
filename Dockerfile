FROM node:19-alpine

WORKDIR /search-app

COPY package.json .

RUN npm run build

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]