FROM crms:latest
WORKDIR /usr/src/crms
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD npm start
