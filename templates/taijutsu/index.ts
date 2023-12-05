import { generatePassword } from '@/lib/generators';
import { Input, ServiceTemplate } from '@/types';

export const generate = ({ projectName }: Input) => {
  const services: ServiceTemplate[] = [];

  const DATABASE_PASSWORD = generatePassword({ hasSpecial: false });
  const NEXTAUTH_SECRET = generatePassword();

  services.push({
    type: 'app',
    data: {
      projectName,
      serviceName: 'nextjs',
      env: [
        `NEXTAUTH_URL=https://$(PRIMARY_DOMAIN)`,
        `NEXTAUTH_SECRET=${NEXTAUTH_SECRET}`,
        `DATABASE_URL=postgres://postgres:${DATABASE_PASSWORD}@$(PROJECT_NAME)_postgres:5432/$(PROJECT_NAME)`,
      ].join('\n'),
      source: {
        type: 'github',
        owner: 'sieutoc-customers',
        repo: projectName,
        ref: 'master',
        path: '/',
        autoDeploy: true,
      },
      build: {
        type: 'nixpacks',
      },
      domains: [
        {
          host: '$(EASYPANEL_DOMAIN)',
          port: 80,
        },
      ],
    },
  });

  services.push({
    // @ts-ignore
    type: 'postgres',
    data: {
      projectName,
      serviceName: 'postgres',
      image: 'postgres:16',
      password: DATABASE_PASSWORD,
    },
  });

  return { services };
};
