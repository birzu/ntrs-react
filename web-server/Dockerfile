# List of all stages in the file [base, dev, test, audit, pre-prod, prod]
# default build without --target results in build image for production
# example -------------------------------------------------------------------
#     docker image build -t YOUR_DOCKER_ID/web-server
# if no target is specified the end result is the production version of the build
#     docker image build -t YOUR_DOCKER_ID/web-server:STAGE --target STAGE
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

# set up tini
# ENV TINI_VERSION v0.18.0
# ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
# RUN chmod +x /tini
##############################################
# graceful shutdowns are handled through code directly

# create a directory for the application with owner node:node
# user node is an unprevileged user provided by the node base image
RUN mkdir -p /opt/node/node_app && chown -R node:node /opt/node/

# switch working directory to /opt/node
WORKDIR /opt/node
# switch to user node and install dependencies
USER node
COPY --chown=node:node package*.json ./
# DO NOT USE --only=development as some dependencies of dependencies do not get installed properly
RUN npm install \
  && npm cache clean --force
# set /opt/node/node_modules/.bin to path
ENV PATH /opt/node/node_modules/.bin:$PATH

WORKDIR /opt/node/node_app
# TODO: add health checks
# ENTRYPOINT ["/tini", "--"]
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
WORKDIR /opt/node/node_app
USER node
COPY --chown=node:node . .
CMD [ "npm", "run", "test" ]

# ____________________________________________________________________________________
# stage: audit
FROM test as audit
RUN npm audit
# TODO: add cve scanner

#  ____________________________________________________________________________________
FROM audit as pre-prod
WORKDIR /opt/node
RUN rm -rf ./node_modules 
WORKDIR /opt/node/node_app
RUN rm -rf ./node_modules && rm -rf ./tests

# ____________________________________________________________________________________
FROM pre-prod as prod
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
COPY --chown=node:node --from=pre-prod /opt/node/node_app /opt/node/node_app
RUN npm ci \
  && npm cache clean --force
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl http://127.0.0.1/ || exit 1
USER node
# base image contains the starting command for running the app








# 