import React from 'react';
import Document, {
  Html, Head, Main, NextScript, DocumentContext,
} from 'next/document';

class AppDocument extends Document<any> {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      // 用于包裹整个react树
      enhanceApp: (App) => App,
      // 用于以每页为单位包装
      enhanceComponent: (Component) => Component,
    });
    // 执行父类的`getInitialProps`方法，现在它包含了定制的`renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { info } = this.props;
    const defaultHead = {
      keywords: 'YeMingRuJing,web前端,nginx,linux,nodejs,vue,react,flutter,react-hooks',
      articleDes: 'YeMingRuJing的个人博客，一个有内涵的web前端，专注vue/react/nodejs/flutter',
      articleTitle: 'YeMingRuJing\'s blog',
    };
    const head = info || defaultHead;
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
