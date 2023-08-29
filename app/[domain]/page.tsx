import { notFound } from 'next/navigation';
import { getSiteData } from '@/lib/fetchers';

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const [data] = await Promise.all([getSiteData(params.domain)]);

  if (!data) {
    notFound();
  }

  return (
    <div className="mb-20 w-full">
      <div className="flex flex-col items-center justify-center py-20">
        we will forward user to their domain instead of displaying here
      </div>
    </div>
  );
}
