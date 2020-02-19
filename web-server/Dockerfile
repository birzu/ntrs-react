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
FROM node:12.16.0-stretch as base

# TODO : ADD LABELS

# node-env
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

# default ports 4000 for app, 9229 for debuging
ARG PORT=4000
ENV PORT $PORT
EXPOSE $PORT 9229

# create a directory for the application with owner node:node
# user node is an unprevileged user provided by the node base image
RUN mkdir /opt/node_app && chown node:node /opt/node_app

# switch working directory to /opt/node_app
WORKDIR /opt/node_app
# switch to user node and install dependencies
USER node
COPY package*.json ./
RUN npm install \
  && npm cache clean --force
# set /opt/node_app/node_modules/.bin to path
ENV PATH /opt/node_app/node_modules/.bin:$PATH
# set up tini
# ENV TINI_VERSION v0.18.0
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
# USER root
# RUN chmod +x /tini
# ENTRYPOINT ["/tini", "--"]
USER node

# TODO: add health checks

# command
CMD [ "node", "server.js" ]

# ____________________________________________________________________________________
# Stage: dev
FROM base as dev
USER node
CMD [ "npm", "run", "dev" ]

# ____________________________________________________________________________________
# TESTS NOT READY YET
# Stage: test
FROM dev as test
WORKDIR /opt/node_app
USER node
COPY . .
CMD [ "npm", "run", "test" ]

# ____________________________________________________________________________________
# stage: audit
FROM test as audit
RUN npm audit
# TODO: add cve scanner

#  ____________________________________________________________________________________
FROM audit as pre-prod
RUN rm -rf ./node_modules && rm -rf ./tests

# ____________________________________________________________________________________
FROM pre-prod as prod
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
COPY --from=pre-prod /opt/node_app /opt/node_app
RUN npm config list \
  && npm ci \
  && npm cache clean --force
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl http://127.0.0.1/ || exit 1
USER node
# base image contains the starting command for running the app








# 