import React, { useState } from "react";
import {
  Row,
  Col,
  Radio,
  Button,
  Divider,
  notification,
  message,
  Form,
} from "antd";
import HeaderInfo from "./HeaderInfo";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import DocumentUpload from "./DocumentUpload";

const Step0 = ({ history }) => {


  const handleFreeze = (vals) => {
    message.info("Please wait...");
    Axios({
      method: "post",
      url: "/api/student/accept",
      data: { will: "ACCEPT", ...vals },
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
      .then((res) => {
        // notification["success"]({
        //   message: "Please Complete Your Application!!",
        // });
        let std = JSON.parse(localStorage.getItem("std"));
        localStorage.setItem(
          "std",
          JSON.stringify({
            ...std,
            step1: true,
            step2: false,
            step3: false,
            step4: false,
            step5: false,
            will: "ACCEPT",
            cstep: 1
          })
        );
        localStorage.setItem("hideWill", true);
        alert("Response recorded. \n Please Complete Your Application!!");
        window.location.reload();
        // localStorage.setItem("x-access-token", "");
        // history.push("/login");
      })
      .catch((err) => {
        notification["error"]({
          message:
            "Something went wrong while updating your progress please consult with the administration if problem persists.",
          description: err.response.data.message,
        });
      });
  };


  return (
    <>
      <div className="field__container">
        <HeaderInfo title="FINAL SEAT LOCKING" />
      </div>

      

     <Row justify="center">
     <Form name="validate_other" onFinish={handleFreeze} scrollToFirstError>
        <Form.Item
          name="isFreezing"
          label="Are you freezing the seat alloted at IIIT Una ?"
          rules={[
            {
              required: true,
              message: 'Please select an option',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="YES">YES</Radio>
            <Radio value="NO">NO</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="partialFeeStatus"
          label="I have paid the Partial Institute Fee to JoSAA"
          rules={[
            {
              required: true,
              message: 'Please select an option',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="YES">YES</Radio>
            <Radio value="NO">NO</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="isCSAB"
          label="Are you participating in CSAB special Rounds ?"
          rules={[
            {
              required: true,
              message: 'Please select an option',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="YES">YES</Radio>
            <Radio value="NO">NO</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
     </Row>
    </>
  );
};

export default withRouter(Step0);
