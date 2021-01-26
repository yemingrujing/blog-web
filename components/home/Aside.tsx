import React from 'react';
import {
  Avatar, Row, Col, Tooltip,
} from 'antd';
import {
  GithubOutlined,
  MailOutlined,
  TwitterOutlined,
  BookOutlined,
  FieldTimeOutlined,
  FolderOpenOutlined,
  TagOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { Container, Item } from '../../static/style/aside';
import Notice from './notice';
import { AddFavorite } from '../../utils';

const Aside = (props) => {
  const {
    tags, category, recent, fetchArticle, total, notice,
  } = props;
  return (
    <Container>
      <Item>
        <div className="profile">
          <Avatar src="/image-base-url/blog/common/1611626314508.png" size="large" shape="circle" />
          <h2>AlanGrady</h2>
          <p>如果第一次失败了，那这是1.0版本，请继续努力</p>
          <Row>
            <Col span={8}>文章 <a href="#article-list"><p>{total}</p></a> </Col>
            <Col span={8}>标签 <a href="#tags"><p>{tags.length}</p></a> </Col>
            <Col span={8}>分类 <a href="#category"><p>{category.length}</p></a> </Col>
          </Row>
          <div className="collect" onClick={() => AddFavorite(window.location.href, document.title)}><BookOutlined />加入书签</div>
          <div className="social">
            <Tooltip title="SpectreAlan"><a
              href="https://github.com/yemingrujing"
              target="_blank"
            ><GithubOutlined />
            </a>
            </Tooltip>
            <Tooltip title="yemingrujing@gmail.com"><a href="mailto:yemingrujing@gmail.com" target="_blank"><MailOutlined /></a></Tooltip>
            <Tooltip title="SpectreAlan"><a
              href="https://twitter.com/yemingrujing"
              target="_blank"
            ><TwitterOutlined />
            </a>
            </Tooltip>
          </div>
        </div>
      </Item>
      <Item>
        <div className="card">
          <h2><SoundOutlined className="SoundOutlined" />公告</h2>
          <Notice notice={notice} />
        </div>
      </Item>
      <Item>
        <div className="card">
          <h2><FieldTimeOutlined />最新文章</h2>
          {
                        recent.map((item, index) => (
                          <Link href={{ pathname: '/detail', query: { id: item.id } }} key={index.toString()}>
                            <Row className="item" gutter={8}>
                              <Col span={8}>
                                <img src={item.cover} alt="" />
                              </Col>
                              <Col span={14}>
                                <h4>{item.articleTitle}</h4>
                                <i>{item.updateTime}</i>
                              </Col>
                            </Row>
                          </Link>
                        ))
                    }
        </div>
      </Item>
      <Item>
        <div className="card" id="category">
          <h2><FolderOpenOutlined />分类</h2>
          {
                        category.map((item, index) => (
                          <Row
                            className="category"
                            key={index.toString()}
                            gutter={8}
                            onClick={() => fetchArticle({ type: 'category', val: item.title })}
                          >
                            <Col span={20}>
                              {item.title}
                            </Col>
                            <Col span={4}>
                              {item.count}
                            </Col>
                          </Row>
                        ))
                    }
        </div>
      </Item>
      <Item>
        <div className="card" id="tags">
          <h2><TagOutlined />标签</h2>
          <div className="tags" id="tage_span">
            {
                            tags.map((item, index) => (
                              <span
                                key={index.toString()}
                                style={{
                                  color: `rgb(${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)}, ${Math.floor(Math.random() * 201)})`,
                                  fontSize: `${Math.floor((Math.random() * 15) + 15)}px`,
                                }}
                                onClick={() => {
                                  fetchArticle({ type: 'tags', val: item.tagName });
                                }}
                              >{item.tagName}
                              </span>
                            ))
                        }
          </div>
        </div>
      </Item>
    </Container>
  );
};

export default Aside;
