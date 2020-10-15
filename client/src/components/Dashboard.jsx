import React from "react";
import { Tabs } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import RegistrationForm from "../pages/Form3";
import Downloads from "./Downloads";
import UploadDocList from "./UploadDocList";
import Form7 from "./Form7";
import Form1 from "../pages/Form1";
import Willingness from "./Willingness";
import Profile from "./Profile";

const { TabPane } = Tabs;

const Dashboard = (props) => {
  const onLogout = () => {
    localStorage.setItem("x-access-token", "");
    props.history.push("/login");
  };
  const std = JSON.parse(localStorage.getItem('std'));
  const { step1, step2, step3, step4, step5 } = std;
  return (
    <div id="dashboard">
      <Tabs defaultActiveKey="6" tabPosition="left">
        <TabPane  tab={`Step 1 - Data Sheet`} key={1} disabled={!step1}>
          <RegistrationForm />
        </TabPane>
        <TabPane tab={`Step 2 - Document Undertaking`} key={2} disabled={!step2}>
          <Form1 />
        </TabPane>
        <TabPane tab={`Step 3 - Upload Documents`} key={3} disabled={!step3}>
          <UploadDocList />
        </TabPane>
        <TabPane tab={`Step 4 - Course Registration`} key={4} disabled={!step4}>
          <Form7 />
        </TabPane>
        <TabPane tab={`Step 5 - Willingness/ Fee details`} key={5} disabled={!step5}>
          <Willingness />
        </TabPane>
        <TabPane tab={`Profile`} key={6}>
            <Profile />
        </TabPane>
        <TabPane tab={`Downloads`} key={7}>
          <Downloads />
        </TabPane>
        <TabPane
          tab={
            <div onClick={onLogout}>
              <span>
                <LogoutOutlined />
              </span>
              Logout
            </div>
          }
          key={8}
        ></TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
