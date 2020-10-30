import React , { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import HeaderInfo from "../components/HeaderInfo";
import Axios from "axios";
import { Link } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Register = ({history}) => {
    const [dis, setDis] = useState(false);
  const onFinish = (values) => {
    // console.log(values);
    setDis(true)
    Axios.post("/api/student/register", { ...values.user })
         .then(res => {
             setDis(false);
             alert(res.data.message);
             history.push("/login");
            })
            .catch(err => {
            setDis(false);
            alert(err.response.data.message);
         })
  };

  return (
    <>
      <div className="field__container">
        <Row justify="center">
          <Col>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/c/cf/Iiit-una-logo.png"
              alt="IIITU"
              style={{
                  maxHeight: "150px"
              }}
            />
          </Col>
          <Col>
            <HeaderInfo title="Student Registration Form." />
          </Col>
        </Row>
      </div>
      <Row justify="center">

      <Form
        {...layout}
        name="std-reg"
        onFinish={onFinish}
        validateMessages={validateMessages}
        >
        <Form.Item
          name={["user", "jeeRegNo"]}
          label="Application No"
          rules={[{ required: true }]}
          >
          <Input placeholder="JEE MAIN application number" />
        </Form.Item>
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[{ required: true }]}
          >
          <Input placeholder="Candidate's Name" />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
          >
          <Input placeholder="Candidate's Email" />
        </Form.Item>
        <Form.Item
          name={["user", "dob"]}
          label="DOB"
          rules={[{ required: true }]}
        >
          <Input placeholder="DOB Format : DD-MM-YYYY" />
        </Form.Item>
        <Form.Item name={["user", "soe"]} label="State Of Eligibility JEE MAIN" rules={[{ required: true }]}>
          <Input placeholder="List can be found on insitute website" />
        </Form.Item>
        <Form.Item name={["user", "fatherName"]} label="Father's Name" rules={[{ required: true }]}>
          <Input placeholder="Candidates father name" />
        </Form.Item>
        <Form.Item name={["user", "mobile"]} label="Mobile No." rules={[{ required: true }]}>
          <Input placeholder="List can be found on insitute website" />
        </Form.Item>
    
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" disabled={dis}>
            Submit
          </Button>
        </Form.Item>
      </Form>
          </Row>
          <Row justify="center">
          Already registered ?
              <Link to="/login"> Login Here</Link>
          </Row>
    </>
  );
};

export default Register;
