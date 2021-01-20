import React, { useState } from 'react';
import {
  Row, Col, Pagination, BackTop,
} from 'antd';
import { Content } from '../static/style/home';
import ArticleList from '../components/home/ArticleList';
import Header from '../components/Head';
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
  const { list, total } = article.data;
  return (
    <>
      <Loading loading={loading} />
      <Header />
      <Content id="article-list">
        <Row className="container">
          <Col lg={17} md={17} sm={24} xs={24}>
            <ArticleList list={list} />
            <Pagination
              defaultCurrent={1}
              total={total}
              pageSize={10}
              className="pagination"
              showTotal={() => `Total ${total} items`}
              onChange={fetchArticle}
            />
          </Col>
        </Row>
      </Content>
    </>
  );
};

Home.getInitialProps = async () => {
  const article = await basic.getArticl({ page: 1 });
  const info = await basic.getInfo('Basic.info');
  return { article, info };
};

export default Home;
