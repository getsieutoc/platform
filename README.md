<img alt="Sieutoc" src="https://github.com/websitesieutoc/platform/assets/1083478/85190f2c-a300-4f2d-bbb2-00cc632c80cf">

<h1 align="center">Sieutoc Platform</h1>

<p align="center">
    Create modern apps easier
</p>

<br/>

## Features

This template includes the following:

- Next.js 14
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
- And plenty of well-crafted components like HeroSection, Features, Pricings, SubscribeForm etc.

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

Optional but highly recommended: Replace all the logo and favicon files in `/public` and meta data with your project resources.

#### Install dependencies

```bash
cd your-project
pnpm install
```

## Setup environment variables

For the first time, you need some default environment variables:

```bash
cp .env.example .env
```

#### If you want to use magic link login

Uncomment the `SMPT` section in `.env` file. By default we already set Mailpit for you.

The mailbox can be reach at http://localhost:8025


#### If you want to use GitHub login

Uncomment the `GITHUB` section in .env file. Follow this [documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) to configure the authentication.

#### Let's get started!

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.

## Further instructions

The idea of this starter is, you can use it to quickly start developing a product/service but still have lot of controls over how you craft the product.

More detailed documentation will be published soon.

## Contributions

If you find this starter template miss something important, feel free to open an issue and we can discuss more about it.

PRs are always welcome. <3
