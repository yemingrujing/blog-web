import React from 'react';
import { BackTop, Timeline } from 'antd';
import Link from 'next/link';
import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Main } from '../static/style/timeLine';
import Basic from '../api/basic';
import basic from '../api/basic';

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
                <Timeline.Item label={k.create_time} key={i}>
                  <Link href={{
                    pathname: '/detail',
                    query: { id: k.id },
                  }}
                  >
                    <a><img src={k.cover} alt="" />{k.article_title}</a>
                  </Link>
                </Timeline.Item>
              ))
            }
          </Timeline>
        </Main>
      </Container>
      <Footer />
      <BackTop />
    </>
  );
};

TimeLine.getInitialProps = async () => basic.getInfo('Basic.TimeLine');

export default TimeLine;
