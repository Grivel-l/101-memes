FROM node:latest

WORKDIR /client
COPY . .

RUN npm install
RUN npm run build
RUN mkdir /static
RUN cp -r ./build/* /static
