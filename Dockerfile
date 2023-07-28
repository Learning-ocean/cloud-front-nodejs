FROM node:14.16.0
RUN mkdir /code
WORKDIR /code
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]