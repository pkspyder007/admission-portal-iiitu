import React, { useState } from "react";
import {
  Row,
  Col,
  Radio,
  Button,
  Divider,
  notification,
  message,
} from "antd";
import HeaderInfo from "./HeaderInfo";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import DocumentUpload from "./DocumentUpload";

const Step0 = ({ history }) => {
  const [will, setWill] = useState("ACCEPT");
  const [ack, setAck] = useState(false);



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
            "Your response for ${will} has been recorded.",
        });
        alert("Please re-login to continue.");
        localStorage.setItem("x-access-token", "");
        localStorage.setItem("hideWill", true);
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
    message.info("Please wait...");

    Axios({
      method: "post",
      url: "/api/student/accept",
      data: { will: "ACCEPT" },
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
    })
      .then((res) => {
        // notification["success"]({
        //   message: "Please Complete Your Application!!",
        // });
        let std = JSON.parse(localStorage.getItem('std'))
        localStorage.setItem('std', JSON.stringify({...std,
          step1: true,
          step2: false,
          step3: false,
          step4: false,
          step5: false,
          will: "ACCEPT",
          cstep: 1
         }));
        localStorage.setItem("hideWill", true);
        alert("Response recorded. \n Please Complete Your Application!!");
        window.location.reload();
        // localStorage.setItem("x-access-token", "");
        // history.push("/login");
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
         
        />
      </div>
      <Row justify="center">
        <Col>
          <Radio.Group onChange={onChange} value={will}>
            <Radio value="ACCEPT">I have paid partial admission fee in JoSAA</Radio>
          </Radio.Group>
        </Col>
        
      </Row>
      <Divider />
      {will==="ACCEPT" ? (<Row justify="center">
          <Button type="primary" size="large" onClick={handleFreeze}>
            {will}
          </Button>
        </Row>): null}
     
      <Divider />
    </>
  );
};

export default withRouter(Step0);
