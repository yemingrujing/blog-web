import React from 'react';
import Head from 'next/head';
import '../public/js/canvas';

const MyHead = (props) => {
  const { info } = props;
  const defaultHead = {
    keywords: 'YeMingRuJing,web前端,nginx,linux,nodejs,vue,react,flutter,react-hooks',
    articleDes: 'YeMingRuJing的个人博客，一个有内涵的web前端，专注vue/react/nodejs/flutter',
    articleTitle: 'YeMingRuJing\'s blog',
  };
  const head = info || defaultHead;
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
      <meta httpEquiv="Content-Security-Policy" content="block-all-mixed-content" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta name="renderer" content="webkit" />
      <meta name="keywords" content={head.keywords} />
      <meta name="Description" content={head.articleDes} />
      <meta name="author" content="AlanGrady" />
      <link rel="shortcut icon" type="image/x-icon" href="image-base-url/blog/common/1611626274801.x-icon" />
      <meta name="sogou_site_verification" content="RSa1MBtgZI" />
      <title key="viewport">{head.articleTitle}</title>
      <script src="/static/yinghua.js" />
      <script src="/static/kindness.js" />
    </Head>
  );
};

export default MyHead;
