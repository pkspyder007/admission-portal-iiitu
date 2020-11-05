import React, { useState } from 'react'
import HeaderInfo from './HeaderInfo'
import { Row, Col, Divider } from 'antd';

const Profile = () => {
  const [std, setStd] = useState(JSON.parse(localStorage.getItem('std')))
  return (
    <>
    <div className="field__container hide-on-print">
      <HeaderInfo title="Student Profile" />
    </div>
    {!std ? 'Loading...' : (
      <div className="hide-on-print">
      <Row justify="start">
        <Col>
          <h3>Name: Mr. / Ms. : </h3>
        </Col>
        <Col>
          <h3>{std.name}</h3>
        </Col>
      </Row>
      <hr />
      <Row justify="start">
        <Col>
          <h3>Registration Number : </h3>
        </Col>
        <Col>
          <h3>{std.regNo}</h3>
        </Col>
      </Row>
      <hr />
      <Row justify="start">
        <Col>
          <h3>School : </h3>
        </Col>
        <Col>
        <h3>{std.branchAlloted !== 'ECE' ? 'School of Computing' : 'School of ELectronics'}</h3>
        </Col>
      </Row>
      <hr />
      <Row justify="start">
        <Col>
          <h3>Brach : </h3>
        </Col>
        <Col>
          <h3>{std.branchAlloted}</h3>
        </Col>
      </Row>
      <hr />
      <Row justify="start">
        <Col>
          <h3>Email Id : </h3>
        </Col>
        <Col>
          <h3>{std.email}</h3>
        </Col>
      </Row>
      <hr/>
      <Row justify="start">
        <Col>
          <h3>Application Status : </h3>
        </Col>
        <Col>
          <h3>{std.completed  ? ' Completed' : ' Incomplete'}</h3>
        </Col>
      </Row>
      <hr/>
      </div>
      )}
      <Divider />
      {/* {std.completed ? 
      (<div>
        <a href="/admit-card">Print Admit card</a>
      </div>) : ""} */}
      
      </>
  )
}

export default Profile
