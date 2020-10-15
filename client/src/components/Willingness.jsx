import React, {useState} from "react";
import { Row, Col, Radio, Button, Divider, notification, message, Input, Space, DatePicker, Form, InputNumber} from "antd";
import HeaderInfo from "./HeaderInfo";
import Axios from "axios";
import { withRouter } from 'react-router-dom';

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

const Willingness = ({history}) => {
  const [will, setWill] = useState("FREEZE");
  const [form] = Form.useForm();

  const handleFieldValue = (field,  value) => {
    form.setFieldsValue({[field]: value});
  }
  const hanldeFloat = () => {
    if(!will) {
      notification["error"]({
        message: 'Please Select an option.'
      });
      return;
    }

    message.info("Please wait...");
    
    Axios({
      method: 'post',
      url: '/api/student/float',
      data: { will: will},
      headers: {
        "x-access-token": localStorage.getItem('x-access-token')
      }
    }).then(res => {
      notification["success"]({
        message: 'Your Application is completed!!',
        description: 'Please re-login and download a copy of your application.'
      })
    }).catch(err => {
      notification["error"]({
        message: 'Something went wrong while updating your progress please consult with the administration if problem persists.',
        description: err.response.data.message
      })
    })
  }

  const handleFreeze = (vals) => {
    message.info("Please wait...");
    
    Axios({
      method: 'post',
      url: '/api/student/freeze',
      data: { ...vals},
      headers: {
        "x-access-token": localStorage.getItem('x-access-token')
      }
    }).then(res => {
      notification["success"]({
        message: 'Your Application is completed!!',
        description: 'Please re-login and download a copy of your application. If not redirected!'
      });
      history.push('/admit-card')
    }).catch(err => {
      notification["error"]({
        message: 'Something went wrong while updating your progress please consult with the administration if problem persists.',
        description: err.response.data.message
      })
    })
  }
  
  const onChange = e => {
    setWill(e.target.value);
  }

  return (
    <>
      <div className="field__container">
        <HeaderInfo
          title="Freeze OR Float"
          note={`
            <strong>
              Note:
            </strong>
            Please select the option carefully.
            <br />
            <br />
          `}
        />
      </div>
      <Row justify="center">
      <Col>
        <Radio.Group onChange={onChange} value={will}>
          <Radio value="FREEZE">FREEZE</Radio>
          <Radio value="FLOAT">FLOAT</Radio>
        </Radio.Group>
      </Col>
    </Row>
    <Divider />
    {will === "FREEZE" ? (<Row justify="center">
      <Col>
        <Form form={form} onFinish={handleFreeze} scrollToFirstError>
        <Form.Item
          className="form__item"
          name="josaaFeeAmount"
          label="JoSSA 2020 Amount(Rs.)"
          rules={[
            {
              required: true,
              message: "Please enter the amount!",
            },
          ]}
        >
          <InputNumber size="large" min={1} />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="josaaFeeDate"
          label="JoSAA Payment Date"
          rules={[
            {
              required: true,
              message: "Please enter date",
            },
          ]}
        >
          <Space direction="vertical">
            <DatePicker onChange={(date, dateStr) => handleFieldValue("josaaFeeDate", dateStr)} format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="instituteFeeAmount"
          label="IIIT Una Institute Fee(Rs.)"
          rules={[
            {
              required: true,
              message: "Please enter the amount!",
            },
          ]}
        >
           <InputNumber size="large" min={1} />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="instituteFeeDate"
          label="Institute Fee Payment Date"
          rules={[
            {
              required: true,
              message: "Please enter date",
            },
          ]}
        >
          <Space direction="vertical">
            <DatePicker onChange={(date, dateStr) => handleFieldValue("instituteFeeDate", dateStr)}format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="instituteFeeReceiptNo"
          label="Institute Fee Payment Receipt No."
          rules={[
            {
              required: true,
              message: "Please enter amount",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="totalFee"
          label="Total(JoSAA+Institute)"
          rules={[
            {
              required: true,
              message: "Please enter amount",
            },
          ]}
        >
           <InputNumber size="large" min={1} />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="hostelFeeAmount"
          label="Hostel Fee(Rs.)"
          rules={[
            {
              required: true,
              message: "Please enter the amount!",
            },
          ]}
        >
           <InputNumber size="large" min={1} />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="hostelFeeDate"
          label="Hostel Fee Payment Date"
          rules={[
            { 
              required: true,
              message: "Please enter date",
            },
          ]}
          // setFieldValue={}
        >
          <Space direction="vertical">
            <DatePicker onChange={(date, dateStr) => handleFieldValue("hostelFeeDate", dateStr)} format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="hotelFeeReceiptNo"
          label="Hostel Fee Payment Receipt No."
          rules={[
            {
              required: true,
              message: "Please enter amount",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="form__item" {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            FREEZE
          </Button>
        </Form.Item>
        </Form>
      </Col>
    </Row>): null}
    <Row justify="center">
      {will ==="FLOAT" ? (<Button type="primary" size="large" onClick={hanldeFloat}>FLOAT</Button>): null}
    </Row>
    <Divider />
    </>
  );
};

export default withRouter(Willingness);
