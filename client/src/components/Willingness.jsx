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
  Typography,
} from "antd";
import HeaderInfo from "./HeaderInfo";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import DocumentUpload from "./DocumentUpload";
import { GoldTwoTone } from "@ant-design/icons";

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
  const [total, setTotal] = useState(0);
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

    if (!ack) {
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
      alert("Please Upload Partial insitute fee receipt...");
      return;
    }

    if (!r2) {
      alert("Please Upload Insitute fee receipt...");
      return;
    }

    if (!r3) {
      alert("Please Upload JoSaa receipt...");
      return;
    }

    

   if((window.confirm("Are you sure to do the final submission. \n This will mark your application Completed.")))  {
    message.info("Please wait...");

    Axios({
      method: "post",
      url: "/api/student/freeze",
      data: { ...vals,totalFee: (+vals['instituteFeeAmount']||0) + (+vals['institutePartialFeeAmount']||0) + (+vals['josaaFeeAmount']||0) },
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
      .then((res) => {
        notification["success"]({
          message: "Your Application is completed!!",
          description:
            "The registration is successfully completed! The confirmation email has been sent to your registered email",
        });
        alert("The registration is successfully completed! The confirmation email has been sent to your registered email");
        localStorage.setItem("cstep", "6");
        // window.location.reload();
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
   } else {
     return;
   }
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
            Please fill the details carefully.
            <br />
            <br />
            <strong>
              Institute fees payment by DD is applicable only to those candidate who opts for in-person/physical reporting at the institute ( TC-II, Chnadput, Haroli, Una , H.P.)
            </strong>
          `}
        />
      </div>

      <Divider />
      {will === "ACCEPT" ? (
        <Row justify="center">
          <Col>
            <Form form={form} onFinish={handleFreeze} scrollToFirstError>
              <Form.Item
                className="form__item"
                name="josaaFeeAmount"
                label="Seat Acceptance fee paid to JoSAA"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount!",
                  },
                ]}
              >
                <Input type="number" min="0" />
              </Form.Item>

              <Form.Item
                className="form__item"
                name="josaaFeeDate"
                label="JoSAA Seat Acceptance fee Payment Date"
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

              <DocumentUpload
                  fileName="josaa-fee-Receipt"
                  title="Receipt- Seat Acceptance fee paid to JoSAA "
                  afterUpload={() => setR3(true)}
                />

              {/* partial fee start */}
              <Form.Item
                className="form__item"
                name="institutePartialFeeAmount"
                label="Partial Institute Fee paid to JoSAA (Rs.)"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount!",
                  },
                ]}
              >
               <Input type="number" min="0" />
              </Form.Item>

              <Form.Item
                className="form__item"
                name="institutePartialFeeDate"
                label="Partial Institute Fee Payment Date"
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
                      handleFieldValue("institutePartialFeeDate", dateStr)
                    }
                    format="DD/MM/YYYY"
                  />
                </Space>
              </Form.Item>

              <Form.Item
                className="form__item"
                name="institutePartialFeeReceiptNo"
                label="Partial Institute Fee Payment Receipt No."
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
                fileName="partial-fee-Receipt"
                title="Receipt- Partial Institute fee paid to JoSAA"
                afterUpload={() => setR1(true)}
              />

              {/* partial fee end */}

              <Form.Item
                className="form__item"
                name="instituteFeeAmount"
                label="IIIT Una remaining Institute Fee applicable."
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount!",
                  },
                ]}
              >
                <Input type="number" min="0" />
              </Form.Item>

              <Form.Item
                className="form__item"
                name="instituteFeeDate"
                label="IIIT UNA Remaining Institute Fee Payment Date"
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
                label="Remaining Institute Fee Payment Receipt No."
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
                fileName="institute-fee-Receipt"
                title="Receipt- IIIT UNA remaining fee payment"
                afterUpload={() => setR2(true)}
              />

          

              <Form.Item shouldUpdate label="Total fee paid during admission process.">
                {() => {
                  const d = form.getFieldsValue();
                  let t = (+d['instituteFeeAmount']||0) + (+d['institutePartialFeeAmount']||0) + (+d['josaaFeeAmount']||0);
                  
                  return (
                   <InputNumber value={t} disabled/>
                  );
                }}
              </Form.Item>

              {/* <Form.Item
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
 */}
                
          <Typography.Text type="danger">*** Before pressing final submission button ( given below), please make sure that you have completed all the previous steps. ***</Typography.Text>
            
              <Form.Item className="form__item" {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  FINAL SUBMISSION
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : null}
      {/* {will !=="ACCEPT" ? (<>
      <Row justify="center">
          <Row>
            <DocumentUpload fileName="hostel-fee-Receipt" title="Hostel FEE Receipt" afterUpload={() => setR1(true)} />
          </Row>
          <Row>
          <Button type="primary" size="large" onClick={hanldeFloat}>{will}</Button>
          </Row>
      </Row>
      </>): null} */}
      {will !== "ACCEPT" ? (
        <Col>
          <Row justify="center">
            <DocumentUpload
              fileName="will-acknowledgement"
              title={`${will} Acknowledgement`}
              afterUpload={() => setAck(true)}
            />
          </Row>
          <Row justify="center">
            <Button type="primary" size="large" onClick={hanldeFloat}>
              {will}
            </Button>
          </Row>
        </Col>
      ) : null}
  
      <Divider />
    </>
  );
};

export default withRouter(Willingness);
