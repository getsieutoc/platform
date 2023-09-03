import { prisma } from '@/lib/prisma';
import Form from '@/components/form';
import { updateSite } from '@/lib/actions/site';
import { Stack } from '@/components';
import { SiteSubdomainForm } from '@/components/client';

export default async function SiteSettingsDomains({
  params,
}: {
  params: { id: string };
}) {
  const site = await prisma.site.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <Stack width="100%" spacing={6}>
      <SiteSubdomainForm site={site} />

      <Form
        title="Subdomain"
        description="The subdomain for your site."
        helpText="Please use 32 characters maximum."
        inputAttrs={{
          name: 'subdomain',
          type: 'text',
          defaultValue: site?.subdomain!,
          placeholder: 'subdomain',
          maxLength: 32,
        }}
        handleSubmit={updateSite}
      />
      <Form
        title="Custom Domain"
        description="The custom domain for your site."
        helpText="Please enter a valid domain."
        inputAttrs={{
          name: 'customDomain',
          type: 'text',
          defaultValue: site?.customDomain!,
          placeholder: 'yourdomain.com',
          maxLength: 64,
          pattern: '^[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}$',
        }}
        handleSubmit={updateSite}
      />
    </Stack>
  );
}
