import React, { useState } from 'react';
import {
  Row, Col, Pagination, BackTop,
} from 'antd';
import { Content } from '../static/style/home';
import ArticleList from '../components/home/ArticleList';
import FullPage from '../components/home/FullPage';
import Header from '../components/Header';
import MyHead from '../components/Head';
import Basic from '../api/basic';
import Loading from '../components/loading';
import Aside from '../components/home/Aside';

const Home = (props) => {
  const p = props;
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(p.article);
  const [listQuery, setListQuery] = useState({ page: 1, category: '', tagName: '' });
  const {
    tags, category, articles, fullPage, poem, notice,
  } = p.info.data;
  console.log('listQuery：{}', listQuery);
  const fetchArticle = async (param) => {
    const url = window.location.href;
    window.location.href = url + (url.includes('#article-list') ? '' : '#article-list');
    const o = { ...listQuery };
    o.page = 1;
    switch (param.type) {
      case 'category':
        o.category = param.val;
        o.tagName = '';
        break;
      case 'tags':
        console.log('param：{}', param);
        o.tagName = param.val;
        o.category = '';
        break;
      default:
        o.page = param;
    }
    setListQuery(o);
    setLoading(true);
    const req = await Basic.getArticl(o);
    setLoading(false);
    setArticle(req);
  };
  const { list, total } = article.data;
  return (
    <>
      <Loading loading={loading} />
      <MyHead />
      <Header />
      <FullPage fullPage={fullPage} poem={poem} />
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
          <Col lg={6} md={6} sm={0} xs={0} offset={1}>
            <Aside
              tags={tags}
              category={category}
              recent={articles}
              fetchArticle={fetchArticle}
              total={total}
              notice={notice}
            />
          </Col>
        </Row>
      </Content>
    </>
  );
};

Home.getInitialProps = async () => {
  const article = await Basic.getArticl({ page: 1 });
  const info = await Basic.getInfo('Basic.info');
  return { article, info };
};

export default Home;
