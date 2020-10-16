import React, {useEffect} from 'react';
import { Form, Input, Button, message, notification } from 'antd';
import Axios from 'axios';
import '../css/general.scss';

const Login = (props) => {

  useEffect(() => {
    Axios({
      method: 'post',
      url: process.env.REACT_APP_BACKEND + "/api/admin/verifyToken",
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    }).then(res => {
      if(res.data.auth) {
        props.history.push("/adminDashboard")
        // alert('you have logged in');
      } else {
        notification["error"]({
          message: "Please Login to continue",
          description: "You have been logged out due to session timeout."
        })
      }
    }).catch(err => {
      // message.error(err.message);
    })
  }, [])

  const onFinish = (values) => {
    Axios.post(process.env.REACT_APP_BACKEND + '/api/admin/login', values)
        .then(({data}) => {
            localStorage.setItem('x-access-token', data.token);
            localStorage.setItem('std', JSON.stringify(data.data));
            message.success(data.message);
            props.history.push('/adminDashboard');
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Jee Reg. No.!',
          },
        ]}
      >
        <Input 
      placeholder="Email"/>
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
