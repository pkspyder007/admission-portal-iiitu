import React from "react";
import { Tabs } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import RegistrationForm from "../pages/Form3";
import Downloads from "./Downloads";
import UploadDocList from "./UploadDocList";
import Form7 from "./Form7";
import Form1 from "../pages/Form1";
import Willingness from "./Willingness";

const { TabPane } = Tabs;

const Dashboard = (props) => {
  const onLogout = () => {
    localStorage.setItem("x-access-token", "");
    props.history.push("/login");
  };
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane tab={`Step 1 - Data Sheet`} key={1}>
          <RegistrationForm />
        </TabPane>
        <TabPane tab={`Step 2 - Upload Documents`} key={2}>
          <UploadDocList />
        </TabPane>
        <TabPane tab={`Step 3 - Document Undertaking`} key={3}>
          <Form1 />
        </TabPane>
        <TabPane tab={`Step 4 - Course Registration`} key={4}>
          <Form7 />
        </TabPane>
        <TabPane tab={`Step 5 - Willingness`} key={5}>
          <Willingness />
        </TabPane>
        <TabPane tab={`Profile`} key={6}>
            profile
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
