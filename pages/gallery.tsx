import React, { useState } from 'react';
import { BackTop, Timeline } from 'antd';
import Link from 'next/link';
import { Container } from '../public/style/timeLine';
import { Main } from '../public/style/gallery';
import MyHead from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImagePreview from '../components/ImagePreview';
import Basic from '../api/basic';

const info = {
  articleTitle: 'YeMingRuJing的个人相册',
  articleDes: 'YeMingRuJing的个人博客，一个有内涵的web前端，专注vue/react/nodejs/flutter,批量压缩，打包下载，压缩质量设置',
  keywords: 'YeMingRuJing,web前端,nginx,linux,nodejs,vue,react,flutter,react-hooks',
};
const Gallery = (props) => {
  const [modal, setModal] = useState({});
  const [show, setShow] = useState(false);
  const {
    list,
    image,
  } = props;
  const o = {};
  list.map((i) => (o[i.title] ? o[i.title].push(i) : (o[i.title] = [], o[i.title].push(i))));
  const gallery = Array.from(Object.keys(o));
  const openModal = (data) => {
    setShow(true);
    setModal(data);
  };
  const closeModal = () => {
    setShow(false);
    setModal({});
  };
  let content;
  if (list && list.length > 0) {
    content = (
      <Main>
        {
          gallery.map((k, i) => (
            <div key={i.toString()}>
              <h3>{k}</h3>
              <div className="list">
                {
                  o[k].map((item, j) => (
                    <div className="item" key={(j + i).toString()}><img src={item.url} alt="item.describe" onClick={() => openModal(item)} /></div>
                  ))
                }</div>
            </div>
          ))
        }
      </Main>
    );
  }
  return (
    <>
      <MyHead info={info} />
      <Header />
      <Container image={image}>
        <div className="top">
          <p>那些年我到过的地方</p>
        </div>
        {content}
      </Container>
      {show && <ImagePreview modal={modal} closeModal={closeModal} />}
      <Footer position="fix" />
      <BackTop />
    </>
  );
};
Gallery.getInitialProps = async (props) => {
  const gallery = await Basic.gallery();
  if (!gallery.data) {
    props.res.redirect('/');
  }
  return gallery.data;
};
export default Gallery;
