FROM node:18-alpine AS base
EXPOSE 1234

FROM base AS dev
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .


FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install --global turbo 
COPY --chown=node:node . .
RUN turbo prune @jotter/collab-server --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
ENV NODE_ENV production
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --chown=node:node .gitignore .gitignore
COPY --chown=node:node --from=builder /app/out/json/ .
RUN npm install
# Build the project
COPY --from=builder --chown=node:node /app/out/full/ .
RUN npm run build

FROM installer as prod
WORKDIR /app/apps/collab-server/dist
# Don't run production as root
USER node
CMD ["node", "index.js"]