import React from "react";
import HeaderInfo from "./HeaderInfo";

import {
    Form,
    Input,
    Row,
    Col,
    Button,
    message,
  } from 'antd';
import Axios from "axios";


  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  

const UpdatePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    message.info("Please wait...");
    Axios({
        method: "post",
        url: "/api/student/updatePassword",
        headers: { "x-access-token": localStorage.getItem("x-access-token")},
        data: {...values}
    }).then(res => {
        alert(res.data.message)
    }).catch(err => {
        alert(err.response.data.message);
    })
  };
  return (
    <div className="field__container">
      <HeaderInfo title="Password update section" />
      <Row justify="center">
        <Col>
          <Form
            form={form}
            name="updatePassword"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="password"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm New Password"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

        
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdatePassword;
