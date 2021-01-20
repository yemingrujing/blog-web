import React, { useState } from 'react';
import { Button } from 'antd';
import MyHead from '../components/Head';
import basic from '../api/basic';
import Loading from '../components/loading';

const Home = (props) => {
  const p = props;
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(p.article);
  const [listQuery, setListQuery] = useState({ page: 1, category: '', tags: '' });
  const {
    tags, category, articles, fullPage, poem, notice,
  } = p.info.data;
  const fetchArticle = async (param) => {
    const url = window.location.href;
    window.location.href = url + (url.includes('#article-list') ? '' : '#article-list');
    const o = { ...listQuery };
    o.page = 1;
    switch (param.type) {
      case 'category':
        o.category = param.val;
        o.tags = '';
        break;
      case 'tags':
        o.tags = param.val;
        o.category = '';
        break;
      default:
        o.page = param;
    }
    setListQuery(o);
    setLoading(true);
    const req = await basic.getArticl('article', o);
    setLoading(false);
    setArticle(req);
  };
  const { list, total } = article;
  return (
    <>
      <Loading loading={loading} />
      <MyHead />
    </>
  );
};

Home.getInitialProps = async () => {
  const article = await basic.getArticl({ page: 1 });
  const info = await basic.getInfo('Basic.info');
  return { article, info };
};

export default Home;
