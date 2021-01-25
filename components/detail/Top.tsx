import React from 'react';
import {
  InboxOutlined, ScheduleOutlined, SyncOutlined, ProfileOutlined, ClockCircleOutlined, RiseOutlined,
} from '@ant-design/icons';
import { TopBox } from '../../static/style/detail';

const Top = (props) => {
  const { info } = props;
  const {
    articleTitle,
    createTime,
    updateTime,
    categoryName,
    readed,
    cover,
    count,
  } = info;
  return (
    <>
      <TopBox cover={cover}>
        <div className="out">
          <h3>{articleTitle}</h3>
          <div className="flex">
            <i><ScheduleOutlined /> 发表于： {createTime}</i>
            <i><SyncOutlined spin />更新于： {updateTime}</i>
            <i><InboxOutlined /> 类别：{categoryName}</i>
          </div>
          <div className="flex">
            <i><ProfileOutlined /> 字数总计: {`${count.toFixed(2)} k`}</i>
            <i><ClockCircleOutlined />建议阅读时长: {Math.ceil(count) || 1} 分钟</i>
            <i><RiseOutlined /> 阅读量: {readed}</i>
          </div>
        </div>
      </TopBox>
    </>
  );
};

export default Top;
