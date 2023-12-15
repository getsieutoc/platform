import { generatePassword } from '@/lib/generators';
import { Input, ServiceTemplate } from '@/types';

export const generate = ({ projectName }: Input) => {
  const services: ServiceTemplate[] = [];

  const DATABASE_PASSWORD = generatePassword({ hasSpecial: false });
  const SECRET_KEY_BASE = generatePassword();

  services.push({
    type: 'app',
    data: {
      projectName,
      serviceName: 'plausible',
      env: [
        `BASE_URL=https://$(PRIMARY_DOMAIN)`,
        `DATABASE_URL=postgres://postgres:${DATABASE_PASSWORD}@$(PROJECT_NAME)_plausible-db:5432/$(PROJECT_NAME)`,
        `CLICKHOUSE_DATABASE_URL=http://$(PROJECT_NAME)_plausible-clickhouse:8123/default`,
        `SECRET_KEY_BASE=${SECRET_KEY_BASE}`,
      ].join('\n'),
      source: {
        type: 'image',
        image: 'plausible/analytics:v2.0.0',
      },
      domains: [
        {
          host: '$(EASYPANEL_DOMAIN)',
          port: 80,
        },
      ],
      deploy: {
        command:
          'sleep 10 && /entrypoint.sh db createdb && /entrypoint.sh db migrate && /entrypoint.sh db init-admin && /entrypoint.sh run',
      },
    },
  });

  services.push({
    type: 'app',
    data: {
      projectName,
      serviceName: 'plausible-clickhouse',
      source: {
        type: 'image',
        image: 'clickhouse/clickhouse-server:23.8-alpine',
      },
      domains: [
        {
          host: '$(EASYPANEL_DOMAIN)',
          port: 8123,
        },
      ],
      mounts: [
        {
          type: 'volume',
          name: 'event-data',
          mountPath: '/var/lib/clickhouse',
        },
        // pay attention to this - this is how to add additional file content ( works for any template )
        {
          type: 'file',
          content: [
            '<yandex>',
            '<profiles>',
            '<default>',
            '<log_queries>0</log_queries>',
            '<log_query_threads>0</log_query_threads>',
            '</default>',
            '</profiles>',
            '</yandex>',
            '',
          ].join('\n'),
          mountPath: '/etc/clickhouse-server/users.d/logging.xml',
        },
        {
          type: 'file',
          content: [
            '<yandex>',
            '<listen_host>0.0.0.0</listen_host>',
            '',
            '<logger>',
            '<level>warning</level>',
            '<console>true</console>',
            '</logger>',
            '',
            '</yandex>',
            '',
          ].join('\n'),
          mountPath: '/etc/clickhouse-server/config.d/logging.xml',
        },
      ],
    },
  });

  services.push({
    // @ts-expect-error wrong type
    type: 'postgres',
    data: {
      image: 'postgres:16',
      projectName,
      serviceName: 'plausible-db',
      password: DATABASE_PASSWORD,
    },
  });

  return { services };
};
