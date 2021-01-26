import React from 'react';
import { Card } from 'antd';
import { LikeFilled } from '@ant-design/icons';
import Router from 'next/router';
import { Container } from '../../static/style/recomend';

const { Meta } = Card;

const Recommend = (props) => {
  let { recommend } = props;
  const { id } = props;
  recommend = recommend.filter((item) => item.id !== id);
  const go = (goId) => {
    Router.prefetch(`/detail?id=${goId}`, `/detail/${goId}`);
  };
  const b = () => {
    Router.back();
  };
  return (
    <Container>
      <h2 onClick={() => b()}><LikeFilled /> 相关推荐</h2>
      <div className="list">
        {
          recommend.map((k, i) => (
            <Card
              key={i.toString()}
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={k.cover} />}
              onClick={() => {
                go(k.id);
              }}
            >
              <Meta title={k.article_title} description={k.create_time} />
            </Card>
          ))
        }
      </div>
    </Container>
  );
};
export default Recommend;
