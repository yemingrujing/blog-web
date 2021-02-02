import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { Container } from '../public/style/footer';
import Loading from './loading';
import Basic from '../api/basic';

const Footer = (props) => {
  const { isHome, position } = props;
  const [info, setInfo] = useState({
    visitors: 0,
    total: 0,
    today: 0,
  });
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
  };
  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    Basic.getInfo('Basic.Statistics')
      .then((res) => setInfo(res.data));
    return () => {
      Router.events.off('routeChangeStart', stopLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);
  return (
    <>
      <Container position={position}>
        <Loading loading={loading} />
        <p>©2018 - 2021 by <a href="https://jszoo.com">yemingrujing </a>
          { isHome === 'detail' && <span> 访客(总数/今日): {info.visitors} / {info.today}, 总访问量: {info.total}</span> }
        </p>
        <img src="/image-base-url/blog/common/1611624316636.gif" alt="copyright" />
      </Container>
    </>
  );
};

export default Footer;
