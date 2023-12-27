FROM node:20.9.0-alpine

WORKDIR /usr/src/app/frontend
COPY package.json ./
COPY tsconfig.json ./
COPY . .
ENV PORT 5300
RUN npm install
RUN npm run build

EXPOSE 5300
CMD [ "npm", "run", "preview" ]