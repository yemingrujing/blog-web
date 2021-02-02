const path = require('path');
const withTypescript = require('@zeit/next-typescript')
const withCss = require('@zeit/next-css')

module.exports = withTypescript(withCss({
  // 输出目录
  distDir: 'build',
  // 本地开发时对页面内容的缓存
  onDemandEntries: {
    // 内容在内存中缓存的时长(ms)
    maxInactiveAge: 25 * 1000,
    // 同时缓存的页面数
    pagesBufferLength: 999,
  },
  // 在pages目录下会被当做页面解析的后缀
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // 手动修改webpack配置
  webpack(config, { buildId, dev, isServer, defaultLoaders }) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
}));
