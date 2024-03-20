# Contributing

This project is a monorepo and uses [turborepo](https://turbo.build/repo) as its
build system with `npm` to manage packages.

## Project Structure

```
apps
    |__ front-end
    |__ collab-server

packages
    |__ eslint-config
    |__ typescript-config
```

`front-end`: The main application powered by Next.js.

`collab-server`: Backend websocket server using HocusPocus and Yjs.

`eslint-config`: Shared ESLint configurations.

`typescript-config`: Shared Typescript configurations.

## Local Development

### Environment Variables

To run the project locally you will need to set up the environment variables.

Take a look at the corresponding `.env.example` file of each application under
the `/app` directory. Most environment variables are specific to each app
with the exception of the **auth secret** that is shared across **front-end**
and **collab-server** to sign and validate JWTs.

Make sure that the value of `NEXTAUTH_SECRET` in front-end matches `AUTH_SECRET`
in collab-server.

After setting up all the environment variables you can run both projects by
running:

```
npm run dev
```
