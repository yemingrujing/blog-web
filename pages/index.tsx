import React from 'react';
import { Button } from 'antd';
import MyHead from '../components/Head';

const Home = (props) => {

  return (
    <>
      <MyHead/>
    </>
  );
};

Home.getInitialProps = async () => {
  const article = await fetch('article', { page: 1 })
  const info = await fetch('info')
  return { article, info }
}

export default Home;
