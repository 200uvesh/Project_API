FROM node:slim
WORKDIR /api
COPY . /api
RUN npm install
EXPOSE 6030
CMD node index.js