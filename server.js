const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const compression = require('compression');

const devProxy = {
  '/image-base-url': {
    target: 'https://raw.githubusercontent.com/yemingrujing/Drawing_Images/main/', // 端口自己配置合适的
    pathRewrite: {
      '^/image-base-url': '',
    },
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    if (dev && devProxy) {
      Object.keys(devProxy)
        .forEach((context) => {
          server.use(createProxyMiddleware(context, devProxy[context]));
        });
    }
    // gzip
    server.use(compression());
    server.use(express.static('seo'));

    server.get('/detail/:id', (req, res) => {
      const actualPage = '/detail';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    const robotsOptions = {
      root: __dirname + '/seo/',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      }
    };
    server.get('/robots.txt', (req, res) => (
      res.status(200)
        .sendFile('robots.txt', robotsOptions)
    ));

    const sitemapOptions = {
      root: __dirname + '/seo/',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
      }
    };
    server.get('/sitemap.xml', (req, res) => (
      res.status(200)
        .sendFile('sitemap.xml', sitemapOptions)
    ));

    server.all('*', (req, res) => {
      handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
    process.exit(1);
  });
