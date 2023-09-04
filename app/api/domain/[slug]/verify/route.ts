import {
  findProject,
  getDomainResponse,
  getConfigResponse,
  verifyDomain,
} from '@/lib/actions/vercel';
import { DomainVerificationStatusProps } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const domain = params.slug;
  const { searchParams } = req.nextUrl;
  const siteId = searchParams.get('siteId');
  const project = await findProject(siteId);

  if (!project) return;

  let status: DomainVerificationStatusProps = 'Valid Configuration';

  const [domainJson, configJson] = await Promise.all([
    getDomainResponse(project.id, domain),
    getConfigResponse(domain),
  ]);

  if (domainJson?.error?.code === 'not_found') {
    // domain not found on Vercel project
    status = 'Domain Not Found';

    // unknown error
  } else if (domainJson.error) {
    status = 'Unknown Error';

    // if domain is not verified, we try to verify now
  } else if (!domainJson.verified) {
    status = 'Pending Verification';
    const verificationJson = await verifyDomain(project.id, domain);

    // domain was just verified
    if (verificationJson && verificationJson.verified) {
      status = 'Valid Configuration';
    }
  } else if (configJson.misconfigured) {
    status = 'Invalid Configuration';
  } else {
    status = 'Valid Configuration';
  }

  return NextResponse.json({
    status,
    domainJson,
  });
}
