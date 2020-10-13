import React from "react";
import { Tabs } from "antd";
import RegistrationForm from "../pages/Form3";
import Downloads from "./Downloads";
import UploadDocList from "./UploadDocList";
import Form7 from "./Form7";
import Form1 from "../pages/Form1"

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <div>
      <Tabs defaultActiveKey="2" tabPosition="left">
        <TabPane tab={`Step 1 - Form 3`} key={1}>
          <RegistrationForm />
        </TabPane>
        <TabPane tab={`Step 2 - Upload Documents`} key={2}>
          <UploadDocList />
        </TabPane>
        <TabPane tab={`Step 3 - Document Undertaking`} key={3}>
            <Form1 />
        </TabPane>
        <TabPane tab={`Step 4 - Form 7`} key={4}>
          <h1>FORM 7</h1>
          <Form7 />
        </TabPane>
        <TabPane tab={`Downloads`} key={7}>
          <Downloads />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
