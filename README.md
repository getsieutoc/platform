<img alt="Sieutoc" src="https://github.com/websitesieutoc/platform/assets/1083478/9fffbada-3bf9-4c3c-b592-fd8ddca53463">

<h1 align="center">Sieutoc Platform</h1>

<p align="center">
    Create modern apps easier
</p>

<br/>

> [!IMPORTANT]
> Working in progress, breaking changes are expected.

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

## Gallery

![Screenshot 2024-01-09 at 20 56 58](https://github.com/websitesieutoc/platform/assets/1083478/f01eba8f-4674-40ad-a823-a499eef7269e)
![Screenshot 2024-01-09 at 20 56 23](https://github.com/websitesieutoc/platform/assets/1083478/cdd50973-8478-478b-9114-398f2b70553b)
![Screenshot 2024-01-09 at 20 54 49](https://github.com/websitesieutoc/platform/assets/1083478/f96c813b-8928-497a-9a85-daf2bf2426ad)

<details>
  <summary>Click me to see more</summary>
    
![Screenshot 2024-01-09 at 20 57 35](https://github.com/websitesieutoc/platform/assets/1083478/a34c4055-f187-4ad5-8224-2b7ec67acec8)
![Screenshot 2024-01-09 at 20 57 16](https://github.com/websitesieutoc/platform/assets/1083478/d543b6ad-1d95-4c28-ad17-6b46cd944a89)
![Screenshot 2024-01-09 at 20 57 12](https://github.com/websitesieutoc/platform/assets/1083478/4ba7869b-c27b-4377-9b75-3a50b3c0ec45)
![Screenshot 2024-01-09 at 20 56 46](https://github.com/websitesieutoc/platform/assets/1083478/b6366cf9-8e5b-414d-802f-124bab2f2100)
![Screenshot 2024-01-09 at 20 56 33](https://github.com/websitesieutoc/platform/assets/1083478/a11c25bd-d781-4c92-a8fb-c8e74adeca35)
![Screenshot 2024-01-09 at 20 56 28](https://github.com/websitesieutoc/platform/assets/1083478/43f7d462-5eeb-4c3c-9f0f-7199fe005915)

</details>

## Getting Started

### For Development

- We use `pnpm` package manager. Get it [here](https://pnpm.io/installation).
- Make sure Docker up and running.
- If your Docker account has 2FA enabled, you have to create a Personal Access Token and login before:
    - Follow [this guide](https://docs.docker.com/docker-hub/access-tokens/).
    - Login with `docker login --username <your-username>`

### Clone the project

You can either use this template by:

- Click the **"Use this template"** button and follow the instruction
- Or using the script below:

```bash
pnpm dlx tiged websitesieutoc/platform your-project
```

Optional: Search and replace `platform` with your project slug.

Optional but highly recommended: Replace all the logo and favicon files in `/public` and meta data with your project resources.

### Install dependencies

```bash
cd your-project
pnpm install
```

## Setup environment variables

For the first time, you need some default environment variables:

```bash
cp .env.example .env
```

### If you want to use magic link login

Uncomment the `SMPT` section in `.env` file. By default we already set Mailpit for you.

The mailbox can be reach at http://localhost:8025


### If you want to use GitHub login

Uncomment the `GITHUB` section in .env file. Follow this [documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) to configure the authentication.


### Setup PostHog

- Register a PostHog account here: https://posthog.com/, or https://posthog.com/eu if you are in EU.
- Create a new project, then follow the instructions to get the POSTHOG_KEY

### Let's get started!

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
