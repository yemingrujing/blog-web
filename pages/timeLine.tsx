import React from 'react';
import { BackTop, Timeline } from 'antd';
import Link from 'next/link';
import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Main } from '../static/style/timeLine';
import Basic from '../api/basic';

const TimeLine = (props) => {
  const {
    list,
    image,
  } = props;
  return (
    <>
      <Head />
      <Header />
      <Container image={image}>
        <div className="top">
          <p>流年不念终将安，时光不老你还在</p>
        </div>
        <Main>
          <Timeline mode="alternate" reverse>
            {
              list.map((k, i) => (
                <Timeline.Item label={k.createTime} key={i.toString()}>
                  <Link href={{
                    pathname: '/detail',
                    query: { id: k.id },
                  }}
                  >
                    <a><img src={`/${k.cover}`} alt="" />{k.articleTitle}</a>
                  </Link>
                </Timeline.Item>
              ))
            }
          </Timeline>
        </Main>
      </Container>
      <Footer position="fix" />
      <BackTop />
    </>
  );
};

TimeLine.getInitialProps = async (props) => {
  const timeLine = await Basic.timeLine();
  if (!timeLine.data) {
    props.res.redirect('/');
  }
  return timeLine.data;
};

export default TimeLine;
