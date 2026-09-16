import type { NextConfig } from 'next';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrganizationSite = repositoryName.endsWith('.github.io');
const pagesBasePath =
  process.env.GITHUB_ACTIONS === 'true' && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  assetPrefix: pagesBasePath,
};

export default nextConfig;
