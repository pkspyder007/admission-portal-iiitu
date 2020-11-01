import React, { useState } from "react";
import {
  Row,
  Col,
  Radio,
  Button,
  Divider,
  notification,
  message,
  Input,
  Space,
  DatePicker,
  Form,
  InputNumber,
} from "antd";
import HeaderInfo from "./HeaderInfo";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import DocumentUpload from "./DocumentUpload";

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

const Willingness = ({ history }) => {
  const [will, setWill] = useState("ACCEPT");
  const [r1, setR1] = useState(false);
  const [r2, setR2] = useState(false);
  const [r3, setR3] = useState(false);
  const [ack, setAck] = useState(false);

  const [form] = Form.useForm();

  const handleFieldValue = (field, value) => {
    form.setFieldsValue({ [field]: value });
  };
  const hanldeFloat = () => {
    if (!will) {
      notification["error"]({
        message: "Please Select an option.",
      });
      return;
    }

    if(!ack) {
      alert(`Please Upload ${will} acknowledgement.`);
      return;
    }

    message.info("Please wait...");

    Axios({
      method: "post",
      url: "/api/student/float",
      data: { will: will },
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
      .then((res) => {
        notification["success"]({
          message: "Your Application is completed!!",
          description:
            "Please re-login and download a copy of your application.",
        });
        alert("Please re-login to continue.");
        localStorage.setItem("x-access-token", "");
        history.push("/login");
      })
      .catch((err) => {
        notification["error"]({
          message:
            "Something went wrong while updating your progress please consult with the administration if problem persists.",
          description: err.response.data.message,
        });
      });
  };

  const handleFreeze = (vals) => {
    if (!r1) {
      alert("Please Upload all recipts...");
      return;
    }

    if (!r2) {
      alert("Please Upload all recipts...");
      return;
    }

    if (!r3) {
      alert("Please Upload all recipts...");
      return;
    }

    message.info("Please wait...");

    Axios({
      method: "post",
      url: "/api/student/freeze",
      data: { ...vals },
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
      .then((res) => {
        notification["success"]({
          message: "Your Application is completed!!",
          description:
            "Please re-login and download a copy of your application. If not redirected!",
        });
        alert("Process completed. Please re-login to continue.");
        localStorage.setItem("x-access-token", "");
        history.push("/login");
      })
      .catch((err) => {
        notification["error"]({
          message:
            "Something went wrong while updating your progress please consult with the administration if problem persists.",
          description: err.response.data.message,
        });
      });
  };

  const onChange = (e) => {
    setWill(e.target.value);
    setAck(false);
  };

  return (
    <>
      <div className="field__container">
        <HeaderInfo
          title="FINAL SEAT LOCKING"
          note={`
            <strong>
              Note:
            </strong>
            Please select the option carefully.
            <br />
            <br />
            <strong>ACCEPT : </strong>
            I accept the seat alloted at IIIT UNA and don't want to participate in CSAB special rounds.
            <br />
            <strong>WITHDRAW : </strong>
            I want to withdraw the seat alloted at IIIT UNA and don't want to participate in CSAB special rounds.
            <br />
            <strong>PARTICIPATE : </strong>
            I want to participate in CSAB special rounds.
          `}
        />
      </div>
      <Row justify="center">
        <Col>
          <Radio.Group onChange={onChange} value={will}>
            <Radio value="ACCEPT">ACCEPT</Radio>
            <Radio value="WITHDRAW">WITHDRAW</Radio>
            <Radio value="PARTICIPATE">PARTICIPATE</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Divider />
      {will === "ACCEPT" ? (
        <Row justify="center">
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
                  <DatePicker
                    onChange={(date, dateStr) =>
                      handleFieldValue("josaaFeeDate", dateStr)
                    }
                    format="DD/MM/YYYY"
                  />
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
                  <DatePicker
                    onChange={(date, dateStr) =>
                      handleFieldValue("instituteFeeDate", dateStr)
                    }
                    format="DD/MM/YYYY"
                  />
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
                  <DatePicker
                    onChange={(date, dateStr) =>
                      handleFieldValue("hostelFeeDate", dateStr)
                    }
                    format="DD/MM/YYYY"
                  />
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

              <DocumentUpload
                fileName="hostel-fee-recipt"
                title="Hostel FEE Recipt"
                afterUpload={() => setR1(true)}
              />
              <DocumentUpload
                fileName="institute-fee-recipt"
                title="Institute FEE Recipt"
                afterUpload={() => setR2(true)}
              />
              <DocumentUpload
                fileName="josaa-fee-recipt"
                title="Josaa FEE Recipt"
                afterUpload={() => setR3(true)}
              />
              <Form.Item className="form__item" {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  ACCEPT
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : null}
      {/* {will !=="ACCEPT" ? (<>
      <Row justify="center">
          <Row>
            <DocumentUpload fileName="hostel-fee-recipt" title="Hostel FEE Recipt" afterUpload={() => setR1(true)} />
          </Row>
          <Row>
          <Button type="primary" size="large" onClick={hanldeFloat}>{will}</Button>
          </Row>
      </Row>
      </>): null} */}
      {will !=="ACCEPT" ? (<Col>
        <Row justify="center">
          <DocumentUpload
            fileName="will-acknowledgement"
            title={`${will} Acknowledgement` }
            afterUpload={() => setAck(true)}
          />
        </Row>
        <Row justify="center">
          <Button type="primary" size="large" onClick={hanldeFloat}>
            {will}
          </Button>
        </Row>
      </Col>) : null}
      <Divider />
    </>
  );
};

export default withRouter(Willingness);
