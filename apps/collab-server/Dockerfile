FROM node:18-alpine AS base
 
FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN npm install --global turbo 
COPY . .
RUN turbo prune @jotter/collab-server --docker
 

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN npm install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN npm run build


FROM installer as runner
WORKDIR /app/apps/collab-server
 
# Don't run production as root
USER node

EXPOSE 1234
CMD ["npm", "start"]