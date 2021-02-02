const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  // 输出目录
  distDir: 'build',
  assetPrefix: '',
  // 是否给每个路由生成Etag
  // Etag是用来做缓存验证的，如果路由执行的时候，新的Etag是相同的，那么就会复用当前内容，而无需重新渲染
  // 默认情况下，nextJS是会对每个路由生成Etag的。但是如果我们部署的时候，ngx已经做了Etag的配置，那么就可以关闭nextJS的Etag，节省性能
  generateEtags: false,
  trailingSlash: true,
  // 在pages目录下会被当做页面解析的后缀
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // 手动修改webpack配置
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
});
