FROM node:16
WORKDIR /dist
COPY package*.json ./
RUN npm install
COPY . .
ENV environment.d.ts
CMD ["npm", "start"]
