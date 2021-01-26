import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { FrownOutlined } from '@ant-design/icons';
import { Container } from '../static/style/error';

const Error = () => {
  const [time, setTime] = useState(5);
  useEffect(() => {
    const inter = setInterval(() => {
      setTime((num) => {
        let t = num;
        if (t === 4) {
          Router.push('/')
            .then(() => {
              console.log(`ERROR：${t}`);
            });
        }
        return t -= 1;
      });
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, []);
  return (
    <Container>
      <div className="out">
        <img src="image-base-url/blog/common/error.gif" alt="error" />
        <div>
          <FrownOutlined />发生了一些意外... <b>{time}</b>秒后将 <span className="go">回到首页</span>
        </div>
      </div>
    </Container>
  );
};
export default Error;
