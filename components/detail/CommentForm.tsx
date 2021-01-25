import {
  Button, Form, Input, message,
} from 'antd';
import { MailOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import Basic from '../../api/basic';

const CommentForm = (props) => {
  const {
    id,
    replayInfo,
    articleTitle,
    replay,
  } = props;
  const placeholder = replayInfo && (replayInfo.nickName || replayInfo.pid !== -1) ? `@${replayInfo.parentNickName || '作者'}` : 'Talk is cheap,show me the code!';
  const onFinish = async (values) => {
    values.articleId = id;
    values.articleTitle = articleTitle;
    values.parentNickName = replayInfo.nickName;
    values.parentId = replayInfo.parentId;
    const res = await Basic.comment(values);
    message.info(res ? '发表成功,评论将在审核通过后显示' : '发表失败，请稍后再试');
    replay({ parentId: replayInfo.parentId });
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label={<span><UserOutlined />&nbsp;昵称&nbsp;</span>}
        name="nickName"
        rules={[{
          required: true,
          message: '请输入您的昵称!',
        }]}
      >
        <Input placeholder="请输入您的昵称..." />
      </Form.Item>
      <Form.Item
        label={<span><MailOutlined />&nbsp;邮箱&nbsp;</span>}
        name="email"
        rules={[{
          type: 'email',
          message: '邮箱格式有误！',
        }, {
          required: true,
          message: '必填!但不会公开',
        }]}
      >
        <Input placeholder="请输入您的邮箱..." />
      </Form.Item>
      <Form.Item
        label={<span><MessageOutlined />&nbsp;评论&nbsp;</span>}
        name="commentContent"
        rules={[{
          required: true,
          message: '请输入您的评论!',
        }]}
      >
        <Input.TextArea placeholder={placeholder} />
      </Form.Item>
      <Form.Item className="submit-comment">
        <Button type="primary" htmlType="submit">提交评论</Button>
      </Form.Item>
    </Form>
  );
};
export default CommentForm;
