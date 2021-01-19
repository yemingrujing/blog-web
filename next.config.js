const withCss = require('@zeit/next-css');

const configs = {
  // 输出目录
  distDir: 'dest',
  // 是否给每个路由生成Etag
  // Etag是用来做缓存验证的，如果路由执行的时候，新的Etag是相同的，那么就会复用当前内容，而无需重新渲染
  // 默认情况下，nextJS是会对每个路由生成Etag的。但是如果我们部署的时候，ngx已经做了Etag的配置，那么就可以关闭nextJS的Etag，节省性能
  generateEtags: true,
  // 本地开发时对页面内容的缓存
  onDemandEntries: {
    // 内容在内存中缓存的时长(ms)
    maxInactiveAge: 25 * 1000,
    // 同时缓存的页面数
    pagesBufferLength: 2,
  },
  // 在pages目录下会被当做页面解析的后缀
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // （不常用）配置buildId，一般用于同一个项目部署多个节点的时候用到
  generateBuildId: async () => {
    if (process.env.YOUR_BUILD_ID) {
      return process.env.YOUR_BUILD_ID;
    }

    // 返回null默认的 unique id
    return null;
  },
  // 手动修改webpack配置
  webpack(config, options) {
    return config;
  },
  // 手动修改webpackDevMiddleware配置
  webpackDevMiddleware(config) {
    return config;
  },
  // 可以在页面上通过process.env.customkey 获取 value
  env: {
    customkey: 'value',
  },
  // 下面两个要通过 'next/config' 来读取
  // 可以在页面上通过引入 import getConfig from 'next/config'来读取

  // 只有在服务端渲染时才会获取的配置
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET,
  },
  // 在服务端渲染和客户端渲染都可获取的配置
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
};

// withCss得到的是一个nextjs的config配置
module.exports = withCss(configs);
