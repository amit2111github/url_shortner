FROM node

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY ./database ./database/
COPY ./utils ./utils/
COPY app.js ./

CMD ["npm", "run", "start"]
