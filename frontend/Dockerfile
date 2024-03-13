
FROM node:14-alpine

WORKDIR /appfrontend

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
