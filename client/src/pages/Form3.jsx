import React, { useState } from "react";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker,
  Radio,
  Space,
  Upload,
  message,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "../css/RegistrationForm.scss";
import TextArea from "antd/lib/input/TextArea";


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];
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

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const { Options } = Select;
  // let uploadProps ={
  //   name: 'doc',
  //   action: '//localhost:4000/api/document/upload',
  //   headers: {
  //     authorization: 'authorization-text',
  //   }
  // }
  // const onFileChange = (info) => {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // }
  
  return (
    <div className="form__container">
      
    <h1>Indian Institute Of Information Technology Una (H.P)</h1>
    <h3>Transit Campus-II Chandpur, Haroli, Una-177220</h3>
    {/* <Upload {...uploadProps} onChange={onFileChange}>
      <Button>Upload</Button>
    </Upload> */}
    <h5>Data Sheet(Session 2020-21)</h5>
      <Form
        className="form__body"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          className="form__item"
          name="date"
          label="Date"
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
          {/* <Input /> */}
          <Space direction="vertical">
            <DatePicker onChange={onChange} format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="registration"
          label="Registration Number"
          rules={[
            {
              required: true,
              message: "Please input your registration number!",
            },
          ]}
        >
          <Input />
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
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="date"
          label="Date of Birth (DD/MM/YYYY)"
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
          {/* <Input /> */}
          <Space direction="vertical">
            <DatePicker onChange={onChange} format="DD/MM/YYYY" />
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
          <Select defaultValue="Male" style={{ width: 120 }}>
            <Option value="Female">Female</Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="category"
          label="Main Category"
          rules={[
            {
              required: true,
              message: "Select your category!",
            },
          ]}
        >
          {/* <Input /> */}
          <Select defaultValue="Select a Category" style={{ width: 200 }}>
            <Option value="OP">OP</Option>
            <Option value="OPPwD">OPPwD</Option>
            <Option value="EWSSC">EWSSC</Option>
            <Option value="SCPwD">SCPwD</Option>
            <Option value="ST">ST</Option>
            <Option value="STPwD">STPwD</Option>
            <Option value="OBC">OBC</Option>
            <Option value="OBCPwD">OBCPwD</Option>
            <Option value="OBC-NCL">OBC-NCL</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="phone"
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
          name="students-aadhar"
          label="Student's Aadhar Number"
          rules={[
            {
              required: true,
              message: "Please enter your aadhar number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="your-locality"
          label="Do you belong to"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Radio.Group>
         <Radio value={1}>Urban Area</Radio>
         <Radio value={2}>Rural Area</Radio>
        </Radio.Group>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="state"
          label="State"
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
          name="correspondence-add"
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
          name="correspondence-pin"
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
          name="permanent-add"
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
          name="permanent-pin"
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
          name="railway-station"
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
          name="jee-main-roll"
          label="JEE(Main) Roll No"
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
          name="jee-main-score"
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
          name="jee-main-air"
          label="JEE(Main) AIR-CRL"
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
          name="jee-main-air-category"
          label="JEE(Main) AIR-Category"
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
          name="admitted-category"
          label="Admitted Category"
          rules={[
            {
              required: true,
              message: "Select your category!",
            },
          ]}
        >
          {/* <Input /> */}
          <Select defaultValue="Select a Category" style={{ width: 200 }}>
            <Option value="OP">OP</Option>
            <Option value="OPPwD">OPPwD</Option>
            <Option value="EWSSC">EWSSC</Option>
            <Option value="SCPwD">SCPwD</Option>
            <Option value="ST">ST</Option>
            <Option value="STPwD">STPwD</Option>
            <Option value="OBC">OBC</Option>
            <Option value="OBCPwD">OBCPwD</Option>
            <Option value="OBC-NCL">OBC-NCL</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="country-12-passed"
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
          name="state-12-passed"
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
          name="12-percentage"
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
          name="12-year-of-passing"
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
          name="school-type"
          label="Type of School"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Radio.Group>
         <Radio value={1}>Govt</Radio>
         <Radio value={2}>Private</Radio>
        </Radio.Group>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="school-location"
          label="School in"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Radio.Group>
         <Radio value={1}>Urban Area</Radio>
         <Radio value={2}>Rural Area</Radio>
        </Radio.Group>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="12-school"
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
          name="12-board"
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
          name="ug-program"
          label="UG Program"
          rules={[
            {
              required: true,
              message: "Please enter program!",
            },
          ]}
        >
          <Input placeholder="Enter B.tech" />
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
        <Radio.Group>
         <Radio value={1}>Computer Science and Engineering</Radio>
         <Radio value={2}>Electronics and Communication Engineering</Radio>
         <Radio value={3}>Information Technology</Radio>
        </Radio.Group>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="is-hosteller"
          label="Hosteller"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Radio.Group>
         <Radio value={1}>Yes</Radio>
         <Radio value={2}>No</Radio>
        </Radio.Group>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="hostel-name"
          label="Hostel Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Radio.Group>
         <Radio value={1}>BOYS</Radio>
         <Radio value={2}>GIRLS</Radio>
        </Radio.Group>
        </Form.Item>



        <Form.Item
          className="form__item"
          name="father-name"
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
          name="father-mobile"
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
          name="father-email"
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
          name="mother-name"
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
          name="mother-mobile"
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
          name="mother-email"
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
          name="guardian-name"
          label="Guardian's Name"
          rules={[
            {
              required: false,
              message: "Please enter guardian's name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="guardian-mobile"
          label="Guardian's Mobile"
          rules={[
            {
              required: false,
              message: "Please enter guardian's mobile!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="form__item"
          name="guardian-email"
          label="Guardian's Email"
          rules={[
            {
              required: false,
              message: "Please enter guardian's email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* FEE STATUS */}

        <Form.Item
          className="form__item"
          name="family-income"
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

        <Form.Item
          className="form__item"
          name="josaa-2020-amount"
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
          name="josaa-date"
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
          {/* <Input /> */}
          <Space direction="vertical">
            <DatePicker onChange={onChange} format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="institute-amount"
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
          name="institute-payment-date"
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
            <DatePicker onChange={onChange} format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="institute-payment-receipt"
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
          name="total-amount"
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
          name="institute-amount"
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
          name="hostel-payment-date"
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
        >
          <Space direction="vertical">
            <DatePicker onChange={onChange} format="DD/MM/YYYY" />
          </Space>
        </Form.Item>

        <Form.Item
          className="form__item"
          name="hostel-payment-receipt"
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

        {/* <Form.Item
          className="form__item"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item> */}

        <Form.Item className="form__item" {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
