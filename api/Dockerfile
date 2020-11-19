FROM node:lts

WORKDIR /app

ENV PORT=80
ENV MEDIA_FOLDER_NAME="media"
ENV SCAN_INTERVAL=10000

COPY . .
RUN npm install && npm run build

EXPOSE ${PORT}
CMD [ "node", "./build/index.js" ]
