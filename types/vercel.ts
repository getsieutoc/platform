export type ErrorResponse = {
  error?: {
    code: string;
    message: string;
  };
};

export type DomainVerificationMessage =
  | 'Valid Configuration'
  | 'Invalid Configuration'
  | 'Pending Verification'
  | 'Domain Not Found'
  | 'Unknown Error';

// From https://vercel.com/docs/rest-api/endpoints#get-a-project-domain
export type Domain = {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
};

export type DomainResponse = Domain & ErrorResponse;

// From https://vercel.com/docs/rest-api/endpoints#get-a-domain-s-configuration
export type DomainConfig = {
  /** How we see the domain's configuration. - `CNAME`: Domain has a CNAME pointing to Vercel. - `A`: Domain's A record is resolving to Vercel. - `http`: Domain is resolving to Vercel but may be behind a Proxy. - `null`: Domain is not resolving to Vercel. */
  configuredBy?: ('CNAME' | 'A' | 'http') | null;
  /** Which challenge types the domain can use for issuing certs. */
  acceptedChallenges?: ('dns-01' | 'http-01')[];
  /** Whether or not the domain is configured AND we can automatically generate a TLS certificate. */
  misconfigured: boolean;
};

export type DomainConfigResponse = DomainConfig & ErrorResponse;

// From https://vercel.com/docs/rest-api/endpoints#verify-project-domain
export interface DomainVerificationResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: (307 | 301 | 302 | 308) | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  /** `true` if the domain is verified for use with the project. If `false` it will not be used as an alias on this project until the challenge in `verification` is completed. */
  verified: boolean;
  /** A list of verification challenges, one of which must be completed to verify the domain for use on the project. After the challenge is complete `POST /projects/:idOrName/domains/:domain/verify` to verify the domain. Possible challenges: - If `verification.type = TXT` the `verification.domain` will be checked for a TXT record matching `verification.value`. */
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export type Project = {
  accountId: string;
  analytics?: {
    id: string;
    canceledAt: number | null;
    disabledAt: number;
    enabledAt: number;
    paidAt?: number;
    sampleRatePercent?: number | null;
    spendLimitInDollars?: number | null;
  };
  autoExposeSystemEnvs?: boolean;
  autoAssignCustomDomains?: boolean;
  autoAssignCustomDomainsUpdatedBy?: string;
  buildCommand?: string | null;
  commandForIgnoringBuildStep?: string | null;
  connectConfigurationId?: string | null;
  connectBuildsEnabled?: boolean;
  createdAt?: number;
  customerSupportCodeVisibility?: boolean;
  crons?: {
    /** The time the feature was enabled for this project. Note: It enables automatically with the first Deployment that outputs cronjobs. */
    enabledAt: number;
    /** The time the feature was disabled for this project. */
    disabledAt: number | null;
    updatedAt: number;
    /** The ID of the Deployment from which the definitions originated. */
    deploymentId: string | null;
    definitions: {
      /** The hostname that should be used. */
      host: string;
      /** The path that should be called for the cronjob. */
      path: string;
      /** The cron expression. */
      schedule: string;
    }[];
  };
  dataCache?: {
    userDisabled: boolean;
    storageSizeBytes?: number | null;
    unlimited?: boolean;
  };
  devCommand?: string | null;
  directoryListing: boolean;
  installCommand?: string | null;
  env?: {
    target?:
      | ('production' | 'preview' | 'development' | 'preview' | 'development')[]
      | ('production' | 'preview' | 'development' | 'preview' | 'development');
    type: 'secret' | 'system' | 'encrypted' | 'plain' | 'sensitive';
    id?: string;
    key: string;
    value: string;
    configurationId?: string | null;
    createdAt?: number;
    updatedAt?: number;
    createdBy?: string | null;
    updatedBy?: string | null;
    gitBranch?: string;
    edgeConfigId?: string | null;
    edgeConfigTokenId?: string | null;
    contentHint?:
      | (
          | {
              type: 'redis-url';
              storeId: string;
            }
          | {
              type: 'redis-rest-api-url';
              storeId: string;
            }
          | {
              type: 'redis-rest-api-token';
              storeId: string;
            }
          | {
              type: 'redis-rest-api-read-only-token';
              storeId: string;
            }
          | {
              type: 'blob-read-write-token';
              storeId: string;
            }
          | {
              type: 'postgres-url';
              storeId: string;
            }
          | {
              type: 'postgres-url-non-pooling';
              storeId: string;
            }
          | {
              type: 'postgres-prisma-url';
              storeId: string;
            }
          | {
              type: 'postgres-user';
              storeId: string;
            }
          | {
              type: 'postgres-host';
              storeId: string;
            }
          | {
              type: 'postgres-password';
              storeId: string;
            }
          | {
              type: 'postgres-database';
              storeId: string;
            }
        )
      | null;
    /** Whether `value` is decrypted. */
    decrypted?: boolean;
  }[];
  framework?:
    | (
        | 'blitzjs'
        | 'nextjs'
        | 'gatsby'
        | 'remix'
        | 'astro'
        | 'hexo'
        | 'eleventy'
        | 'docusaurus-2'
        | 'docusaurus'
        | 'preact'
        | 'solidstart'
        | 'dojo'
        | 'ember'
        | 'vue'
        | 'scully'
        | 'ionic-angular'
        | 'angular'
        | 'polymer'
        | 'svelte'
        | 'sveltekit'
        | 'sveltekit-1'
        | 'ionic-react'
        | 'create-react-app'
        | 'gridsome'
        | 'umijs'
        | 'sapper'
        | 'saber'
        | 'stencil'
        | 'nuxtjs'
        | 'redwoodjs'
        | 'hugo'
        | 'jekyll'
        | 'brunch'
        | 'middleman'
        | 'zola'
        | 'hydrogen'
        | 'vite'
        | 'vitepress'
        | 'vuepress'
        | 'parcel'
        | 'sanity'
        | 'storybook'
      )
    | null;
  gitForkProtection?: boolean;
  gitLFS?: boolean;
  id: string;
  latestDeployments?: {
    alias?: string[];
    aliasAssigned?: (number | boolean) | null;
    aliasError?: {
      code: string;
      message: string;
    } | null;
    aliasFinal?: string | null;
    automaticAliases?: string[];
    builds?: {
      use: string;
      src?: string;
      dest?: string;
    }[];
    connectBuildsEnabled?: boolean;
    connectConfigurationId?: string;
    createdAt: number;
    createdIn: string;
    creator: {
      email: string;
      githubLogin?: string;
      gitlabLogin?: string;
      uid: string;
      username: string;
    } | null;
    deploymentHostname: string;
    name: string;
    forced?: boolean;
    id: string;
    meta?: { [key: string]: string };
    monorepoManager?: string | null;
    plan: 'pro' | 'enterprise' | 'hobby' | 'oss';
    private: boolean;
    readyState: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';
    readySubstate?: 'STAGED' | 'PROMOTED';
    requestedAt?: number;
    target?: string | null;
    teamId?: string | null;
    type: 'LAMBDAS';
    url: string;
    userId: string;
    withCache?: boolean;
    checksConclusion?: 'succeeded' | 'failed' | 'skipped' | 'canceled';
    checksState?: 'registered' | 'running' | 'completed';
    readyAt?: number;
    buildingAt?: number;
    /** Whether or not preview comments are enabled for the deployment */
    previewCommentsEnabled?: boolean;
  }[];
  link?:
    | {
        org?: string;
        repo?: string;
        repoId?: number;
        type?: 'github';
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        projectId?: string;
        projectName?: string;
        projectNameWithNamespace?: string;
        projectNamespace?: string;
        projectUrl?: string;
        type?: 'gitlab';
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      }
    | {
        name?: string;
        slug?: string;
        owner?: string;
        type?: 'bitbucket';
        uuid?: string;
        workspaceUuid?: string;
        createdAt?: number;
        deployHooks: {
          createdAt?: number;
          id: string;
          name: string;
          ref: string;
          url: string;
        }[];
        gitCredentialId?: string;
        updatedAt?: number;
        sourceless?: boolean;
        productionBranch?: string;
      };
  name: string;
  nodeVersion: '18.x' | '16.x' | '14.x' | '12.x' | '10.x';
  outputDirectory?: string | null;
  passwordProtection?: {
    deploymentType: 'preview' | 'all';
  } | null;
  productionDeploymentsFastLane?: boolean;
  publicSource?: boolean | null;
  rootDirectory?: string | null;
  serverlessFunctionRegion?: string | null;
  skipGitConnectDuringLink?: boolean;
  sourceFilesOutsideRootDirectory?: boolean;
  ssoProtection?: {
    deploymentType: 'preview' | 'all';
  } | null;
  targets?: {
    [key: string]: {
      alias?: string[];
      aliasAssigned?: (number | boolean) | null;
      aliasError?: {
        code: string;
        message: string;
      } | null;
      aliasFinal?: string | null;
      automaticAliases?: string[];
      builds?: {
        use: string;
        src?: string;
        dest?: string;
      }[];
      connectBuildsEnabled?: boolean;
      connectConfigurationId?: string;
      createdAt: number;
      createdIn: string;
      creator: {
        email: string;
        githubLogin?: string;
        gitlabLogin?: string;
        uid: string;
        username: string;
      } | null;
      deploymentHostname: string;
      name: string;
      forced?: boolean;
      id: string;
      meta?: { [key: string]: string };
      monorepoManager?: string | null;
      plan: 'pro' | 'enterprise' | 'hobby' | 'oss';
      private: boolean;
      readyState: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';
      readySubstate?: 'STAGED' | 'PROMOTED';
      requestedAt?: number;
      target?: string | null;
      teamId?: string | null;
      type: 'LAMBDAS';
      url: string;
      userId: string;
      withCache?: boolean;
      checksConclusion?: 'succeeded' | 'failed' | 'skipped' | 'canceled';
      checksState?: 'registered' | 'running' | 'completed';
      readyAt?: number;
      buildingAt?: number;
      /** Whether or not preview comments are enabled for the deployment */
      previewCommentsEnabled?: boolean;
    } | null;
  };
  transferCompletedAt?: number;
  transferStartedAt?: number;
  transferToAccountId?: string;
  transferredFromAccountId?: string;
  updatedAt?: number;
  live?: boolean;
  enablePreviewFeedback?: boolean | null;
  permissions?: unknown;
  lastRollbackTarget?: { [key: string]: unknown } | null;
  lastAliasRequest?: {
    fromDeploymentId: string;
    toDeploymentId: string;
    jobStatus: 'succeeded' | 'failed' | 'skipped' | 'pending' | 'in-progress';
    requestedAt: number;
    type: 'promote' | 'rollback';
  } | null;
  hasFloatingAliases?: boolean;
  protectionBypass?: {
    [key: string]:
      | {
          createdAt: number;
          createdBy: string;
          scope: 'shareable-link' | 'automation-bypass';
        }
      | {
          createdAt: number;
          lastUpdatedAt: number;
          lastUpdatedBy: string;
          access: 'requested' | 'granted';
          scope: 'user';
        };
  };
  hasActiveBranches?: boolean;
  trustedIps?:
    | (
        | {
            deploymentType: 'preview' | 'all' | 'production';
            addresses: {
              value: string;
              note?: string;
            }[];
            protectionMode: 'additional' | 'exclusive';
          }
        | {
            deploymentType: 'preview' | 'all' | 'production';
          }
      )
    | null;
  gitComments?: {
    /** Whether the Vercel bot should comment on PRs */
    onPullRequest: boolean;
    /** Whether the Vercel bot should comment on commits */
    onCommit: boolean;
  };
};

export type ProjectResponse = Project & ErrorResponse;
