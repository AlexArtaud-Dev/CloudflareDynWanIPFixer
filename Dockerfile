FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json jest.config.js ./

RUN npm install

COPY src ./src
COPY tests ./tests

RUN npm run build

CMD ["npm", "run", "start"]
