FROM node:lts

WORKDIR /usr/src/app

ENV PORT=80
ENV MEDIA_FOLDER_NAME="media"
ENV SCAN_INTERVAL=10000

COPY . .
RUN npm install && npm run build

EXPOSE ${PORT}
CMD [ "node", "./build/index.js" ]
