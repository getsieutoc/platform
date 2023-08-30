import { placeholderBlurhash } from '@/lib/utils';
import { Site } from '@prisma/client';
import { NextLink, NextImage } from '@/components';
import { InsertChartIcon } from '@/icons';

export default function SiteCard({ data }: { data: Site }) {
  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <NextLink
        href={`/site/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <NextImage
          alt={data.name ?? 'Card thumbnail'}
          width={500}
          height={400}
          className="h-44 object-cover"
          src={data.image ?? '/placeholder.png'}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white dark:text-white">
            {data.name}
          </h3>
          <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </NextLink>
      <NextLink
        href={`/site/${data.id}/analytics`}
        className="flex items-center rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400 dark:hover:bg-green-800 dark:hover:bg-opacity-50"
      >
        <InsertChartIcon height={16} />
      </NextLink>
    </div>
  );
}
