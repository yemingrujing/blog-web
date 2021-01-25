import React, { useEffect, useState } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import MarkNav from 'markdown-navbar';
import { BackTop } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import MyHead from '../components/Head';
import Header from '../components/Header';
import Comment from '../components/detail/Comment';
import Top from '../components/detail/Top';
import { DetailContent, Aside, Container } from '../static/style/detail';
import config from '../config/markdown.config';
import { CopyCode } from '../utils';
import Footer from '../components/Footer';
import Recommend from '../components/detail/Recommend';
import ImagePreview from '../components/ImagePreview';
import Basic from '../api/basic';

hljs.configure(config.hljs);
marked.setOptions({
  highlight: (code) => hljs.highlightAuto(code).value,
  ...config.options,
});

const Detail = (props) => {
  const [modal, setModal] = useState({});
  const [show, setShow] = useState(false);
  const {
    id,
    keywords,
    tic,
    articleTitle,
    articleDes,
    articleContent,
    createTime,
    updateTime,
    categoryName,
    readed,
    cover,
    recommend,
    comments,
  } = props;
  console.log(`articleContent：${articleContent}`);
  const detail = Buffer.from(articleContent)
    .toString();
  const previewImgEvent = () => {
    const detailContent = document.getElementById('detail-content');
    const images = detailContent.getElementsByTagName('img');
    for (let i = 0; i < images.length; i += 1) {
      const img = images[i];
      img.style.cursor = 'pointer';
      img.addEventListener('click', previewImg, false);
    }
  };
  const closeModal = () => {
    setShow(false);
    setModal({});
  };
  const previewImg = (e) => {
    setShow(true);
    setModal({ url: e.target.getAttribute('src') });
  };
  useEffect(() => {
    CopyCode();
    previewImgEvent();
  }, []);
  return (
    <>
      <MyHead info={{
        keywords,
        articleTitle,
        articleDes,
      }}
      />
      <Header />
      <Aside id="sidebar">
        <h3>文章目录</h3>
        {
          tic
            ? (
              <MarkNav
                className="article-menu"
                source={detail}
                headingTopOffset={50}
              />
            )
            : <SmileOutlined />
        }
      </Aside>
      <DetailContent id="DetailContent">
        <Top info={{
          createTime,
          updateTime,
          articleTitle,
          categoryName,
          readed,
          cover,
          count: detail.length / 1000,
        }}
        />
        <Container>
          <div id="detail-content" dangerouslySetInnerHTML={{ __html: marked(detail) }} />
          {recommend.length > 1 && <Recommend recommend={recommend} id={id} />}
          <Comment comments={comments} article={articleTitle} id={id} />
        </Container>
        <Footer />
      </DetailContent>
      {show && <ImagePreview modal={modal} closeModal={closeModal} />}
      <BackTop />
    </>
  );
};
Detail.getInitialProps = async (props) => {
  const detail = await Basic.detail({ id: props.query.id });
  if (!detail.data) {
    props.res.redirect('/');
  }
  return detail.data;
};

export default Detail;
