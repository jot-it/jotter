
ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base
EXPOSE 1234

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install --global turbo
COPY --chown=node:node . .
# https://turbo.build/repo/docs/reference/command-line-reference/prune
RUN turbo prune @jotter/collab-server --docker

# First install the dependencies (as they change less often)
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY --chown=node:node .gitignore .gitignore
# Add lockfile and package.json's of every workspace
COPY --chown=node:node --from=builder /app/out/json/ .
RUN npm install

FROM installer as dev
WORKDIR /app/apps/collab-server
USER node
CMD ["npm", "run", "dev"]

FROM installer as prod
# Build the project
COPY --from=builder --chown=node:node /app/out/full/ .
RUN npm run build
WORKDIR /app/apps/collab-server/dist
# Don't run production as root
USER node
CMD ["node", "index.js"]
