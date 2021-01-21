import React from 'react';
import { Row, Col } from 'antd';
import { InboxOutlined, ScheduleOutlined } from '@ant-design/icons/lib/icons';
import Link from 'next/link';
import { Container } from '../../static/style/article';

const ArticleList = (props) => {
  const { list } = props;
  console.log('Props：{}', list);
  return list.map((item, index) => (
    <Container key={index.toString()}>
      <Row className="item">
        <Col lg={8} md={8} sm={0} xs={0} className="left">
          <img src={item.cover} alt={item.articleTitle} />
        </Col>
        <Col lg={16} md={16} sm={24} xs={24} className="right">
          <Link href={`/detail?id=${item.id}`} as={`/detail/${item.id}`}>
            <h2>{item.articleTitle}</h2>
          </Link>
          <p>
            <ScheduleOutlined /> {item.createTime} |
            <InboxOutlined /> <span><Link href={`/detail?id=${item.id}`} as={`/detail/${item.id}`}>{item.categoryName}</Link></span>
          </p>
          <div>
            {item.description}
          </div>
        </Col>
      </Row>
    </Container>
  ));
};
export default ArticleList;
