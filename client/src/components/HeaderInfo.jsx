import { Row, Col } from "antd";
import React from "react";

const HeaderInfo = ({ title, note }) => {
  return (
    <div>
      <Row justify="center">
      <img
            src="https://upload.wikimedia.org/wikipedia/en/c/cf/Iiit-una-logo.png"
            height="135px"
            alt="IIIT UNA"
            style={{marginRight: "24px"}}
          />
      </Row>
      <Row justify="center">
         
        <Col>
          <h1>Indian Institute Of Information Technology Una </h1>
          <h2>Transit Campus-II Chandpur, Haroli, Una , H.P. - 177220</h2>
          <h3>B.Tech Admissions</h3>
          <h4>{title}</h4>
          <p dangerouslySetInnerHTML={{ __html: note }}></p>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderInfo;
