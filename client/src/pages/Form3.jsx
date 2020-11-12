import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Space,
  message,
  notification
} from "antd";
import "../css/RegistrationForm.scss";
import TextArea from "antd/lib/input/TextArea";
import Axios from 'axios';
import HeaderInfo from "../components/HeaderInfo";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
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

const RegistrationForm = () => {
  const [form] = Form.useForm();
  // const [std, setStd] = useState({regNo: '', jeeReg: '', category: '', branchAlloted:''});
  const [token, setToken] = useState('')

  useEffect(() => {
    const std = JSON.parse(localStorage.getItem('std'));
    // setStd(std);
    setToken(localStorage.getItem('x-access-token'))
    handleFieldValue("regNo", std.regNo);
    handleFieldValue("name", std.name);
    handleFieldValue("email", std.email);
    handleFieldValue("jeeMainRoll", std.jeeRegNo);
    handleFieldValue("branch", std.branchAlloted);
    // handleFieldValue("branch", std.branchAlloted);

    return () => {
      // cleanup
    }
  }, [])

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    Axios({
      'method': 'post',
      url: '/api/student/form3',
      headers: {'x-access-token': localStorage.getItem('x-access-token')},
      data: values
    }).then(res=> {
      message.success(res.data.message);
      let std = JSON.parse(localStorage.getItem('std'))
      localStorage.setItem('std',JSON.stringify({...std,
        step1: false,
        step2: true,
        step3: false,
        step4: false,
        step5: false,
       }));
       localStorage.setItem("cstep", "2");
       alert("Step Completed.")
       window.location.reload();
    }).catch(err => {
      console.log(err);
      message.error(err.response.data.message);
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  const handleFieldValue = (field,  value) => {
    form.setFieldsValue({[field]: value});
  }
  return (
    <div className="form__container">
   <div className="field__container">
   <HeaderInfo
      title="Data Sheet(Session 2020-21)"
    />
   </div>
      <Form
        className="form__body"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          // residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "+91",
        }}
        scrollToFirstError
      >
        {/* <Form.Item
          className="form__item"
          name="date"
          label="Date"
          rules={[
            {
              required: true,
              message: "Please enter date",
            },
          ]}
        >
          {/* <Input /> */}
          {/* <Space direction="vertical">
            <DatePicker disabled initialValue={new Date().toString('dd-MM-yyyy')} placeholder={new Date().toString('dd-MM-yyyy')} onChange={(date, dateStr) => handleFieldValue("date", dateStr)} format="DD/MM/YYYY" />
          </Space>
        </Form.Item> */}

        <Form.Item
          className="form__item"
          name="regNo"
          label="Registration Number"
          rules={[
            {
              required: true,
              message: "Please input your registration number!",
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="dob"
          label="Date of Birth (DD/MM/YYYY)"
          rules={[
            {
              required: true,
              message: "Please enter ypur DOB",
            },
          ]}
        >
          {/* <Input /> */}
          <Space direction="vertical">
            <DatePicker onChange={(date, dateStr) => handleFieldValue("dob", dateStr)} format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="religion"
          label="Religion"
          rules={[
            {
              required: true,
              message: "Please enter your religion!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Select your gender!",
            },
          ]}
        >
          <Select onChange={(gender) => handleFieldValue("gender", gender)} style={{ width: 120 }}>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="mainCategory"
          label="Main Category"
          rules={[
            {
              required: true,
              message: "Select your category!",
            },
          ]}
        >
          {/* <Input /> */}
          <Select onChange={(cat) => handleFieldValue("mainCategory", cat)} style={{ width: 200 }}>
          <Option value="OPEN">OPEN</Option>
            <Option value="OPEN-PwD">OPEN-PwD</Option>
            <Option value="SC">SC</Option>
            <Option value="SC-PwD">SC-PwD</Option>
            <Option value="ST">ST</Option>
            <Option value="ST-PwD">ST-PwD</Option>
            <Option value="OBC-NCL">OBC-NCL</Option>
            <Option value="OBC-NCL-PwD">OBC-NCL-PwD</Option>
            <Option value="GEN-EWS">GEN-EWS</Option>
            <Option value="GEN-EWS-PwD">GEN-EWS-PwD</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="studentMobile"
          label="Student's Mobile Number"
          rules={[
            {
              required: true,
              message: "Please input your mobile number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="studentAadharNo"
          label="Student's Aadhaar Number"
          rules={[
            {
              required: true,
              message: "Please enter your aadhaar number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="areaType"
          label="Do you belong to"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Select onChange={(val) => handleFieldValue("areaType", val)} style={{ width: 200 }}>
            <Option value="RURAL">RURAL</Option>
            <Option value="URBAN">URBAN</Option>
          </Select>
         </Form.Item> 

        <Form.Item
          className="form__item"
          name="state"
          label="State of residency"
          rules={[
            {
              required: true,
              message: "Please enter your state!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="country"
          label="Country"
          rules={[
            {
              required: true,
              message: "Please enter your country!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="correspondingAddress"
          label="Correspondence Address"
          rules={[
            {
              required: true,
              message: "Please enter your addres!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="correspondingPin"
          label="Correspondence Address PIN"
          rules={[
            {
              required: true,
              message: "Please enter your pin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="permanentAddress"
          label="Permanent Address"
          rules={[
            {
              required: true,
              message: "Please enter your addres!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="permanentPin"
          label="Permanent Address PIN"
          rules={[
            {
              required: true,
              message: "Please enter your pin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="nearestRailwayStation"
          label="Nearest Railway Station"
          rules={[
            {
              required: true,
              message: "Please enter the data!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="jeeMainRoll"
          label="JEE(Main) Roll No"
          rules={[
            {
              required: true,
              message: "Please enter the data!",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          className="form__item"
          name="jeeMainScore"
          label="JEE(Main) Score"
          rules={[
            {
              required: true,
              message: "Please enter the data!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="jeeMainAirCrl"
          label="JEE(Main) AIR-CRL"
          rules={[
            {
              required: true,
              message: "Please enter the data!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="jeeMainAirCat"
          label="JEE(Main) AIR-Category"
          rules={[
            {
              required: true,
              message: "Please enter the data!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="admittedCategory"
          label="Admitted Category"
          rules={[
            {
              required: true,
              message: "Select your category!",
            },
          ]}
        >
          {/* <Input /> */}
          <Select onChange={val => handleFieldValue("admittedCategory", val)}  style={{ width: 200 }}>
            <Option value="OPEN">OPEN</Option>
            <Option value="OPEN-PwD">OPEN-PwD</Option>
            <Option value="SC">SC</Option>
            <Option value="SC-PwD">SC-PwD</Option>
            <Option value="ST">ST</Option>
            <Option value="ST-PwD">ST-PwD</Option>
            <Option value="OBC-NCL">OBC-NCL</Option>
            <Option value="OBC-NCL-PwD">OBC-NCL-PwD</Option>
            <Option value="GEN-EWS">GEN-EWS</Option>
            <Option value="GEN-EWS-PwD">GEN-EWS-PwD</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="countryFrom12"
          label="Country from where 10+2 passed"
          rules={[
            {
              required: true,
              message: "Please enter your country!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="stateFrom12"
          label="State from where 10+2 passed"
          rules={[
            {
              required: true,
              message: "Please enter your state!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="percentage12"
          label="10+2 Percentage"
          rules={[
            {
              required: true,
              message: "Please enter your percentage!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="yearPassing12"
          label="10+2 Year of Passing"
          rules={[
            {
              required: true,
              message: "Please enter your year!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="typeOfSchool"
          label="Type of School"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Select onChange={(val) => handleFieldValue("typeOfSchool", val)} style={{ width: 200 }}>
            <Option value="GOVT">GOVT</Option>
            <Option value="PRIVATE">PRIVATE</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="areaOfSchool"
          label="School in"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Select onChange={(val) => handleFieldValue("areaOfSchool", val)} style={{ width: 200 }}>
            <Option value="URBAN">URBAN</Option>
            <Option value="RURAL">RURAL</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="schoolName12"
          label="Name of 10+2 School"
          rules={[
            {
              required: true,
              message: "Please enter your school!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="board12"
          label="Name of 10+2 Board"
          rules={[
            {
              required: true,
              message: "Please enter board!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="ugProgram"
          label="UG Program"
          rules={[
            {
              required: true,
              message: "Please enter program!",
            },
          ]}
          initialValue="B.TECH"
        >
          <Input placeholder="Enter B.tech"  disabled />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="branch"
          label="Branch"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Select disabled onChange={val => handleFieldValue("branch", val)}>
         <Option value="CSE">Computer Science and Engineering</Option>
         <Option value="IT">Information Technology</Option>
         <Option value="ECE">Electronics and Communication Engineering</Option>
        </Select>
        </Form.Item>

        {/* <Form.Item
          className="form__item"
          name="hostelName"
          label="Hostel Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Select onChange={(val) => handleFieldValue("hostelName", "DEFAULT")} style={{ width: 200 }} disabled>
            <Option value="BOYS">Boys</Option>
            <Option value="GIRLS">Girls</Option>
          </Select>
        </Form.Item> */}



        <Form.Item
          className="form__item"
          name="fatherName"
          label="Father's Name"
          rules={[
            {
              required: true,
              message: "Please enter father's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="fatherMobile"
          label="Father's Mobile"
          rules={[
            {
              required: true,
              message: "Please enter father's mobile!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="fatherEmail"
          label="Father's Email"
          rules={[
            {
              required: false,
              message: "Please enter father's email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="motherName"
          label="Mother's Name"
          rules={[
            {
              required: true,
              message: "Please enter mother's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="motherMobile"
          label="Mother's Mobile"
          rules={[
            {
              required: true,
              message: "Please enter mother's mobile!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="motherEmail"
          label="Mother's Email"
          rules={[
            {
              required: false,
              message: "Please enter mother's email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="gaurdianName"
          label="Gaurdian's Name"
          rules={[
            {
              required: false,
              message: "Please enter gaurdian's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="gaurdianMobile"
          label="Gaurdian's Mobile"
          rules={[
            {
              required: false,
              message: "Please enter gaurdian's mobile!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="gaurdianEmail"
          label="Gaurdian's Email"
          rules={[
            {
              required: false,
              message: "Please enter gaurdian's email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form__item"
          name="annualFamilyIncome"
          label="Annual Family's Income (Rs.)"
          rules={[
            {
              required: true,
              message: "Please enter annual income!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* FEE STATUS */}
          {/*}

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
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="josaaFeeDate"
          label="JoSAA Payment Date"
          rules={[
            {
              type: "date",
              message: "The input is not valid date",
            },
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
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="instituteFeeDate"
          label="Institute Fee Payment Date"
          rules={[
            {
              type: "date",
              message: "The input is not valid date",
            },
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
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="hostelFeeDate"
          label="Hostel Fee Payment Date"
          rules={[
            {
              type: "date",
              message: "The input is not valid date",
            },
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

        */}

        <Form.Item className="form__item" {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
