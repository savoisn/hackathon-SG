FROM node:6

COPY . /code
WORKDIR /code

RUN npm install

CMD node .
