FROM node:latest

WORKDIR /client
COPY . .

RUN npm install
RUN npm run build
RUN mkdir /static
RUN cp -r ./build/* /static

CMD while [ 1 ]; do sleep 1; done
