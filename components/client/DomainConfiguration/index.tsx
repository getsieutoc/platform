'use client';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Code,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@/components/chakra';
import { useDomainStatus, useState } from '@/hooks';
import { getSubdomain } from '@/lib/domains';

import { SimpleTable } from '../SimpleTable';

const recordColumns = [
  { header: 'Type', accessorKey: 'type' },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Value', accessorKey: 'value' },
  { header: 'TTL', accessorKey: 'ttl' },
];

export const DomainConfiguration = ({
  siteId,
  domain,
}: {
  siteId?: string | null;
  domain: string;
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { status, message, domainJson, isLoading } = useDomainStatus({ siteId, domain });

  if (!message || message === 'Valid Configuration' || !domainJson) return null;

  const subdomain = getSubdomain(domainJson.name, domainJson.apexName);

  const txtVerification =
    (message === 'Pending Verification' &&
      domainJson.verification.find((x: any) => x.type === 'TXT')) ||
    null;

  const handleChangeTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Flex direction="column" fontSize="sm" padding={2} gap={2}>
      <Alert status={status}>
        <AlertIcon />

        <AlertTitle>{message}</AlertTitle>

        {isLoading && <AlertDescription>Checking...</AlertDescription>}
      </Alert>

      {txtVerification ? (
        <>
          <p className="text-sm dark:text-white">
            Please set the following TXT record on <Code>{domainJson.apexName}</Code> to
            prove ownership of <Code>{domainJson.name}</Code>:
          </p>
          <div className="my-5 flex items-start justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
            <div>
              <p className="text-sm font-bold">Type</p>
              <p className="mt-2 font-mono text-sm">{txtVerification.type}</p>
            </div>
            <div>
              <p className="text-sm font-bold">Name</p>
              <p className="mt-2 font-mono text-sm">
                {txtVerification.domain.slice(
                  0,
                  txtVerification.domain.length - domainJson.apexName.length - 1
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-bold">Value</p>
              <p className="mt-2 font-mono text-sm">
                <span className="text-ellipsis">{txtVerification.value}</span>
              </p>
            </div>
          </div>
          <p className="text-sm dark:text-stone-400">
            Warning: if you are using this domain for another site, setting this TXT
            record will transfer domain ownership away from that site and break it. Please
            exercise caution when setting this record.
          </p>
        </>
      ) : message === 'Unknown Error' ? (
        <p className="mb-5 text-sm dark:text-white">{domainJson.error.message}</p>
      ) : (
        <>
          <Tabs size="sm" index={tabIndex} onChange={handleChangeTab}>
            <TabList>
              <Tab>A Record {!subdomain && '(recommended)'}</Tab>
              <Tab>CNAME Record{subdomain && ' (recommended)'}</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text as="p" fontSize="xs">
                  To configure your apex domain <Code>{domainJson.apexName}</Code>, set
                  the following A record on your DNS provider to continue:
                </Text>
                <Text as="p" fontSize="xs" mb={2}>
                  Note: for TTL, if 86400 is not available, set the highest value
                  possible. Also, domain propagation can take up to an hour.
                </Text>

                <SimpleTable
                  columns={recordColumns}
                  data={[
                    {
                      id: 'A',
                      type: 'A',
                      name: '@',
                      value: '76.76.21.21',
                      ttl: 86400,
                    },
                  ]}
                />
              </TabPanel>
              <TabPanel>
                <Text as="p" fontSize="xs">
                  To configure your subdomain <Code>{domainJson.name}</Code>, set the
                  following CNAME record on your DNS provider to continue:
                </Text>

                <Text as="p" fontSize="xs" mb={2}>
                  Note: for TTL, if 86400 is not available, set the highest value
                  possible. Also, domain propagation can take up to an hour.
                </Text>

                <SimpleTable
                  columns={recordColumns}
                  data={[
                    {
                      id: 'CNAME',
                      type: 'CNAME',
                      name: subdomain ?? 'www',
                      value: `cname.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                      ttl: 86400,
                    },
                  ]}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Flex>
  );
};
