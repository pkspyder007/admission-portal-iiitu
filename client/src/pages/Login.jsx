import React from 'react';
import { Form, Input, Button, message } from 'antd';
import Axios from 'axios';

const Login = (props) => {
  const onFinish = (values) => {
    Axios.post('/api/student/login', values)
        .then(({data}) => {
            localStorage.setItem('x-access-token', data.token);
            localStorage.setItem('std', JSON.stringify(data.data));
            message.success(data.message);
            props.history.push('/form3');
        })
        .catch(err => {
            console.log(err.message);
            message.error()
        })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
        <img src="https://upload.wikimedia.org/wikipedia/en/c/cf/Iiit-una-logo.png" alt="IIIT UNA"/>
    
    <Form
    className="login-container"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
      className="login-input"
        label="Username"
        name="jeeRegNo"
        rules={[
          {
            required: true,
            message: 'Please input your Jee Reg. No.!',
          },
        ]}
      >
        <Input 
      placeholder="JEE(MAIN) REG NUMBER"/>
      </Form.Item>

      <Form.Item
            className="login-input"

        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
      placeholder="PASSWORD" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;
