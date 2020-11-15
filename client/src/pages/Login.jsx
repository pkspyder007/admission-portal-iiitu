import React, {useEffect} from 'react';
import { Link } from "react-router-dom"
import { Form, Input, Button, message, notification, Row } from 'antd';
import Axios from 'axios';
import CyberNauts from '../components/CyberNauts';

const Login = (props) => {

  useEffect(() => {
    Axios({
      method: 'post',
      url: "/api/student/verifyToken",
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    }).then(res => {
      if(res.data.auth) {
        props.history.push("/")
      } else {
        notification["error"]({
          message: "Please Login to continue",
          description: "You have been logged out. Please Login again"
        })
      }
    }).catch(err => {
      // message.error(err.message);
    })
  }, [])

  const onFinish = (values) => {
    Axios.post('/api/student/login', values)
        .then(({data}) => {
            localStorage.setItem('x-access-token', data.token);
            localStorage.setItem('std', JSON.stringify(data.data));
            message.success(data.message);
            props.history.push('/');
        })
        .catch(err => {
            console.log(err.message);
            message.error(err.response.data.message)
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
    <Row justify="center">
          Not registered ?
              <Link to="/register"> Register Here</Link>
          </Row>
          <CyberNauts />
    </div>
  );
};

export default Login;
