FROM node

WORKDIR /app

COPY package.json ./

COPY ./public ./public

# RUN npm install -g npm@latest

RUN npm install --legacy-peer-deps
# --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]