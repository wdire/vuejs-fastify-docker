FROM node:20.9.0-alpine

WORKDIR /usr/src/app
COPY package.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build

EXPOSE 5500
CMD [ "npm", "start" ]