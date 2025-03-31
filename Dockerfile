FROM node

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY ./wait-for-it.sh ./
COPY ./database ./database/
COPY ./utils ./utils/
COPY app.js ./

RUN chmod +x ./wait-for-it.sh

ENTRYPOINT ["./wait-for-it.sh", "db:5432", "--","./wait-for-it.sh", "redis:6379", "--"]
CMD ["node", "app.js"]
