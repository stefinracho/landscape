# source: https://docs.strapi.io/cms/installation/docker#development-dockerfile

FROM node:22-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY apps/cms/package.json apps/cms/package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

WORKDIR /opt/app
COPY . .

WORKDIR /opt/app/apps/cms

ENV PATH /opt/node_modules/.bin:$PATH
RUN chown -R node:node /opt/app
USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]
