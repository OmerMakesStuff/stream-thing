# Stream Thing

<!-- Test-only change for verifying the branch, commit, push, and pull request workflow. -->

This is a platform that allows you to livestream video, and watch streams by other users. It's similar to Twitch, though I guess it's not as good.

Technologies used in this project include:

- [React](https://react.dev/) and [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/) for auth
- [LiveKit](https://livekit.io/) for live video streaming
- [UploadThing](https://uploadthing.com/) for uploading stream thumbnails
- [Postgres](https://www.postgresql.org/) DB
- [Prisma ORM](https://www.prisma.io/)
- [Docker](https://www.docker.com/) compose in local development (runs the app itself, an Ngrok service, and Prisma studio)

## Prerequisites

- Nodejs 20
- Docker

## Getting Started

- First, copy the content of `.env.example` into a new `.env` file, and fill in all missing values.
- Install all dependencies:

  ```bash
  pnpm i
  ```

- To run all services:

  ```bash
  docker compose up -d
  ```

  The app will be available at [localhost:3000](http://localhost:3000), and also at the specified `NGROK_DOMAIN`.
  To run just the app and no other services, only at [localhost:3000](http://localhost:3000):

  ```bash
  pnpm dev
  ```
