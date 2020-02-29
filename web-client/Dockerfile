# List of all stages in the file [base, dev, test, audit, pre-prod, prod]
# default build without --target results in build image for production
# example -------------------------------------------------------------------
#     docker image build -t YOUR_DOCKER_ID/web-client
# if no target is specified the end result is the production version of the build
#     docker image build -t YOUR_DOCKER_ID/web-client:STAGE --target STAGE
# where STAGE refers to different stages and YOUR_DOCKER_ID refers to your docker id
# ---------------------------------------------------------------------------
# using Node:12.16.0-stretch as base image
# Dockerfile of the base image https://github.com/nodejs/docker-node/blob/a24f83a3d2646bc0a45511aba312cc4a63f2d965/12/stretch/Dockerfile
# STAGE- base
FROM node:12.16.0 as base

# node environment
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# port
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229

# since in production the client will be compiled to static files that will be hosted in nginx server
# we don't need to setup any gracefull shutdown for node process
# node process will only be used in development and testing phase

# create a working dir for the react app
RUN mkdir -p /opt/node/react_app && chown -R node:node /opt/node
# switch workdir to opt/node
USER node
WORKDIR /opt/node
# copy package*.json files
COPY --chown=node:node package*.json ./
# run npm install  DO NOT USE --only=development flag
RUN npm install && \
    npm cache clean --force
# SET node_modules to path
ENV PATH /opt/node/node_modules/.bin:$PATH
# TODO: add healthchecks
# switch the working dir to /opt/node/react_app
WORKDIR /opt/node/react_app
# each stage will include the starting cmd for the particular stage

# STAGE dev
FROM base as dev
CMD [ "npm", "start" ]

# STAGE test
FROM dev as test
# copy the files for testing
WORKDIR /opt/node/react_app
USER node
COPY --chown=node:node . .
CMD [ "npm", "run", "test" ]

# STAGE audit
FROM test as audit
# audit using npm
RUN npm audit
# TODO: use cve scanner

# STAGE pre-prod
# the pre-prod stage will be the builder whice compiles the code
FROM test as pre-prod
WORKDIR /opt/node/react_app
COPY --from=test /opt/node/react_app ./
# this will generate the static files for the app
CMD [ "npm", "run", "build" ]

# STAGE prod
FROM nginx:1.16.1-alpine as prod
# copy the static files from the pre-prod stage build folder
COPY --from=pre-prod /opt/node/react_app/build/* /usr/share/nginx/html



