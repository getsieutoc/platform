
  <img alt="Sieutoc" src="https://github.com/websitesieutoc/platform/assets/1083478/85190f2c-a300-4f2d-bbb2-00cc632c80cf">

  <h1 align="center">Sieutoc Platform</h1>


<p align="center">
Create modern apps easier
</p>

<br/>

## Features

This template includes the following:

- Next.js 13
- TypeScript
- ESLint
- Prettier
- Chakra UI
- Prisma
- Next-Auth
- Docker Compose with:
    - PostgresQL
    - Redis
    - Mailpit

## Demo

https://platform.sieutoc.website


## Getting Started

#### For Development

- We use `pnpm` package manager. Get it [here](https://pnpm.io/installation).
- Make sure Docker up and running.
- If your Docker account has 2FA enabled, you have to create a Personal Access Token and login before:
    - Follow [this guide](https://docs.docker.com/docker-hub/access-tokens/).
    - Login with `docker login --username <your-username>`

#### Clone the project

You can either use this template by:

- Click the **"Use this template"** button and follow the instruction
- Or using the script below:

```bash
npx tiged websitesieutoc/platform your-project
```

Optional: Search and replace `platform` with your project slug.

#### Install dependencies

```bash
cd your-project
pnpm install
```

#### Setup environment variables

For the first time, you need some default environment variables:

```bash
cp .env.example .env
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.
