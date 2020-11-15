import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import HeaderInfo from "../components/HeaderInfo";
import Axios from "axios";
import { Link } from "react-router-dom";
// import { useForm } from "antd/lib/form/Form";

const { Option } = Select;

const states = [
  "ANDHRA PRADESH",
  "Arunachal Pradesh",
  "ASOM",
  "BIHAR",
  "CHANDIGARH (UT)",
  "CHHATTISGARH",
  "DELHI (NCT)",
  "GUJARAT",
  "GOA",
  "GUJARAT",
  "HARYANA",
  "HIMACHAL PRADESH",
  "JAMMU & KASHMIR (UT)",
  "JHARKHAND",
  "KARNATAKA",
  "KERALA",
  "MADHYA PRADESH",
  "MAHARASTRA",
  "MANIPUR",
  "MEGHALAYA",
  "MIZORAM",
  "NAGALAND",
  "ORISSA",
  "PUNJAB",
  "RAJASTHAN",
  "SIKKIM",
  "TAMIL NADU",
  "TELANGANA",
  "UTTAR PRADESH",
  "UTTARAKHAND",
  "WEST BENGAL",
  "Andaman and Nicobar",
  "Pondicherry",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
];

export const stateList = states;

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

const Register = ({ history }) => {
  const [dis, setDis] = useState(false);
  const [form] = Form.useForm();

  const handleFieldValue = (field, value) => {
    form.setFieldsValue({ [field]: value });
  };

  const onFinish = (values) => {
    // console.log(values);
    // return;
    setDis(true);
    Axios.post("/api/student/register", { ...values })
      .then((res) => {
        setDis(false);
        alert(res.data.message);
        history.push("/login");
      })
      .catch((err) => {
        setDis(false);
        alert("Information Provided dosen't match with our records.");
      });
  };

  return (
    <>
      <div className="field__container" style={{padding: "24px"}}>
        <Row justify="center">
          <Col>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/c/cf/Iiit-una-logo.png"
              alt="IIITU"
              style={{
                maxHeight: "150px",
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
          form={form}
          name="std-reg"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"jeeRegNo"}
            label="Application No"
            rules={[{ required: true }]}
          >
            <Input placeholder="JEE MAIN application number" />
          </Form.Item>
          <Form.Item
            name={"rank"}
            label="Rank"
            rules={[{ required: true }]}
          >
            <Input placeholder="JEE MAIN Category rank" />
          </Form.Item>
          <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
            <Input placeholder="Candidate's Name" />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input placeholder="Candidate's Email" />
          </Form.Item>
          <Form.Item name={"dob"} label="DOB" rules={[{ required: true }]}>
            <Input placeholder="DOB Format : DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name={"soe"}
            label="State Of Eligibility"
            rules={[{ required: true }]}
          >
            {/* <Input placeholder="List can be found on insitute website" /> */}
            <Select
              onChange={(val) => handleFieldValue("soe", val)}
              style={{ width: 200 }}
            >
              {states.map((s,i) => <Option value={s} key={i}>{s}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name={"fatherName"}
            label="Father's Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Candidates father name" />
          </Form.Item>
          <Form.Item
            name={"mobile"}
            label="Mobile No."
            rules={[{ required: true }]}
          >
            <Input placeholder="Contact Number of candidate" />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" disabled={dis}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
      <Row justify="center">
        Already registered ?<Link to="/login"> Login Here</Link>
      </Row>
      
    </>
  );
};

export default Register;
