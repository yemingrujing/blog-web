import React from 'react';
import { Descriptions } from 'antd';
import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import hljs from 'highlight.js';
import marked from 'marked';
import { Container } from '../public/style/timeLine';
import { Main } from '../public/style/about';
import MyHead from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import config from '../config/markdown.config';

hljs.configure(config.hljs);
marked.setOptions({
  highlight: (code) => hljs.highlightAuto(code).value,
  ...config.options,
});
const About = () => (
  <>
    <MyHead />
    <Header />
    <Container image="image-base-url/blog/common/me.jpg">
      <div className="top">
        <p>YeMingRuJing</p>
      </div>
      <Main>
        <Descriptions title="关于我的博客" layout="vertical" column={2}>
          <Descriptions.Item label="博客前台">
            采用SSR技术,基于 React 的 Next.js框架 <br />
            UI层使用Antd、Sass、styled-components<br />
            数据请求使用axios<br />
            解析markdown采用 marked<br />
            生成文章目录使用 markdown-navbar ，语法高亮 highlight.js
          </Descriptions.Item>
          <Descriptions.Item label="前台源码">
            <div id="detail-content" dangerouslySetInnerHTML={{ __html: marked('[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=yemingrujing&repo=blog-web&theme=great-gatsby)](https://github.com/yemingrujing/blog-web)') }} />
          </Descriptions.Item>
          <Descriptions.Item label="后台管理">
            VUE全家桶、axios、echarts<br />
            UI层使用 ElementUI 、Sass<br />
            使用 vue-element-admin 模板生成基础架构<br />
            新建/编辑文章使用 tui-editor
          </Descriptions.Item>
          <Descriptions.Item label="后台源码">
            <div id="detail-content" dangerouslySetInnerHTML={{ __html: marked('[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=yemingrujing&repo=blog-admin&theme=algolia)](https://github.com/yemingrujing/blog-admin)') }} />
          </Descriptions.Item>
          <Descriptions.Item label="中台数据接口">
            基础架构使用阿里的Egg.js<br />
            所有的图片使用github图传，通过GitHub api上传至仓库<br />
            定时任务每天向百度站长推送文章链接<br />
            数据库使用mysql
          </Descriptions.Item>
          <Descriptions.Item label="中台源码">
            <div id="detail-content" dangerouslySetInnerHTML={{ __html: marked('[![ReadMe Card](https://github-readme-stats.vercel.app/api/pin/?username=yemingrujing&repo=blog-server&theme=cobalt)](https://github.com/yemingrujing/blog-server)') }} />
          </Descriptions.Item>
        </Descriptions>
        <Descriptions title="关于我自己" layout="vertical" column={2}>
          <Descriptions.Item label="Name">YeMingRuJing</Descriptions.Item>
          <Descriptions.Item label="email">yemingrujing@gmail.com</Descriptions.Item>
          <Descriptions.Item label="Hometown">ShangHai - JiaDing </Descriptions.Item>
          <Descriptions.Item label="Live">China</Descriptions.Item>
          <Descriptions.Item label="Other Contacts" span={2}>
            <a href="https://github.com/yemingrujing" target="_blank" title="yemingrujing"><GithubOutlined /></a>
            <a href="https://twitter.com/yemingrujing" target="_blank" title="yemingrujing"><TwitterOutlined /></a>
          </Descriptions.Item>
          <Descriptions.Item label="Summary" span={2}>
            近些年一直从事web前端开发工作，熟悉前端主要技术栈，平时喜欢研究web前端、服务器方面的各种技术
          </Descriptions.Item>
          <Descriptions.Item label="Skills - 前端" span={2}>
            技术栈：H5/CSS3、vue全家桶、react全家桶、Next、webpack<br />
            UI框架：Bootstrap、Element、Vant、Antd-design、Layui等<br />
            移动端：Flutter、RN
          </Descriptions.Item>
          <Descriptions.Item label="Skills - 后端" span={2}>
            主要技术栈：JAVA、Node、Mysql<br />
            框架：Koa2、Egg.js
          </Descriptions.Item>
        </Descriptions>,
      </Main>
    </Container>
    <Footer />
  </>
);
export default About;
