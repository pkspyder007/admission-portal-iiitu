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
import StudentInfo from "./StudentInfo";
import Step0 from "./Step0";
import UpdatePassword from "./UpdatePassword";

const { TabPane } = Tabs;

const Dashboard = (props) => {
  const onLogout = () => {
    localStorage.setItem("x-access-token", "");
    props.history.push("/login");
  };
  let std = JSON.parse(localStorage.getItem('std'));
  if(!std) {
    std = {will: "ACCEPT"}
  }
  const hideWill = std.will !== "FREEZE-DEFAULT";
  let cstep = localStorage.getItem("cstep");
  if(!cstep) {
    localStorage.setItem("cstep", "0");
    cstep = 0;
  }
  if(!std) {
    props.history.push("/login");
    return
  }
  const { completed, step1} = std;
  return (
    <div id="dashboard">
      <Tabs defaultActiveKey={cstep} tabPosition="left">
        <TabPane tab={`Willingness`} key={0} disabled={hideWill}>
          <Step0 />
        </TabPane>
        <TabPane  tab={`Step 1 - Data Sheet`} key={1} disabled={completed}>
          {step1 && (<RegistrationForm />)}
          {!step1 && (<StudentInfo />)}
          {/* <StudentInfo /> */}
        </TabPane>
        <TabPane tab={`Step 2 - Document Undertaking`} key={2} disabled={completed}>
          <Form1 />
        </TabPane>
        <TabPane tab={`Step 3 - Upload Documents`} key={3} disabled={completed}>
          <UploadDocList />
        </TabPane>
        <TabPane tab={`Step 4 - Course Registration`} key={4} disabled={completed}>
          <Form7 />
        </TabPane>
        <TabPane tab={`Step 5 - Fee details`} key={5} disabled={completed}>
          <Willingness />
        </TabPane>
        <TabPane tab={`Profile`} key={6}>
            <Profile />
        </TabPane>
        <TabPane tab={`Update Password`} key={7}>
            <UpdatePassword />
        </TabPane>
        <TabPane tab={`Forms /More Info`} key={8}>
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
          key={9}
        ></TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
