/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fase 0: dynamic server runtime (was `output: 'export'`) for future
  // Neon-backed pages + Cache Components. No `out/` directory produced.
  cacheComponents: true,
  // Keep generated agent files out of the repo (next dev re-creates them otherwise).
  agentRules: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'miro.medium.com' },
      { protocol: 'https', hostname: 'cdn-images-1.medium.com' },
      // Dormant until Fase 1 (R2 cutover); avoids a second config PR.
      { protocol: 'https', hostname: 'cdn.eisd.site' },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig

