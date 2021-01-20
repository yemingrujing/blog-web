import React from 'react';
import { Button } from 'antd';
import MyHead from '../components/Head';
import basic from '../api/basic';

const Home = (props) => {
  const { info, article } = props;
  return (
    <>
      <MyHead info={info} />
    </>
  );
};

Home.getInitialProps = async () => {
  const article = await basic.getArticl({ page: 1 });
  const info = await basic.getInfo('Basic.info');
  return { article, info };
};

export default Home;
