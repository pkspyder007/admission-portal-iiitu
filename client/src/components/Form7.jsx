import React from 'react'
import { Row, Col, Table, Divider, Checkbox, Button, notification } from 'antd'
import HeaderInfo from './HeaderInfo';
import { useState, useEffect } from 'react';
import Axios from "axios";

const CSEList = [
  {
    sno: 1,
    code: 'MAC101',
    title: 'Engineering Mathematics',
    l:3,
    t:1,
    p:0,
    credits:4
  },
  {
    sno: 2,
    code: 'CYC102',
    title: 'Engineering Chemistry',
    l:2,
    t:0,
    p:4,
    credits:4
  },
  {
    sno: 3,
    code: 'EEC103',
    title: 'Basic Electrical and Electronics Engineering',
    l:3,
    t:0,
    p:4,
    credits:5
  },
  {
    sno: 4,
    code: 'BIC104',
    title: 'Introduction to Biology',
    l:2,
    t:0,
    p:0,
    credits:3
  },
  {
    sno: 5,
    code: 'CSL105',
    title: 'Computer Workshop',
    l:0,
    t:0,
    p:4,
    credits:2
  },
  {
    sno: 6,
    code: 'CSL106',
    title: 'Practicum-I',
    l:0,
    t:0,
    p:6,
    credits:3
  },
  {
    sno: '',
    code: '',
    title: 'Total',
    l: 11,
    t:1,
    p: 18, 
    credits: 21,
  }
];

const ITList = [
  {
    sno: 1,
    code: 'MAC121',
    title: 'Engineering Mathematics',
    l:3,
    t:1,
    p:0,
    credits:4
  },
  {
    sno: 2,
    code: 'PHC121',
    title: 'Engineering Physics',
    l:3,
    t:0,
    p:4,
    credits:5
  },
  {
    sno: 3,
    code: 'BIC103',
    title: 'Engineering Chemistry',
    l:3,
    t:0,
    p:0,
    credits:3
  },
  {
    sno: 4,
    code: 'ITC104',
    title: 'Basics of Programming in C.',
    l:3,
    t:0,
    p:4,
    credits:5
  },
  {
    sno: 5,
    code: 'ENC125',
    title: 'Communication Skills',
    l:3,
    t:0,
    p:5,
    credits:4
  },
  {
    sno: 6,
    code: 'ITL106',
    title: 'Practicum-I',
    l:0,
    t:0,
    p:6,
    credits:3
  },
  {
    sno: '',
    code: '',
    title: 'Total',
    l: 15,
    t:1,
    p: 18, 
    credits: 25,
  }
];

const ECEList = [
  {
    sno: 1,
    code: 'MAC131',
    title: 'Engineering Mathematics',
    l:3,
    t:1,
    p:0,
    credits:4
  },
  {
    sno: 2,
    code: 'PHC131',
    title: 'Electricity, Magnetism, and Quantum Mechanics',
    l:3,
    t:0,
    p:4,
    credits:5
  },
  {
    sno: 3,
    code: 'EVC103',
    title: 'Basic Environmental Science and Engineering',
    l:3,
    t:0,
    p:0,
    credits:3
  },
  {
    sno: 4,
    code: 'ECC104',
    title: 'Electrical Circuits and Networks',
    l:3,
    t:0,
    p:4,
    credits:5
  },
  {
    sno: 5,
    code: 'ENC135',
    title: 'Communication Skills',
    l:3,
    t:0,
    p:5,
    credits:4
  },
  {
    sno: 6,
    code: 'ECL106',
    title: 'Practicum-I',
    l:0,
    t:0,
    p:6,
    credits:3
  },
  {
    sno: '',
    code: '',
    title: 'Total',
    l: 15,
    t:1,
    p: 18, 
    credits: 25,
  }
];

// const CSETotal = { l: 11,  t:1, p: 18, credits: 21};
// const ITTotal = { l: 15,  t:1, p: 18, credits: 25};
// const ECETotal = { l: 15,  t:1, p: 18, credits: 25};

const columns = [
  {
    title: 'S. No.',
    dataIndex: 'sno',
    key: 'sno',
  },
  {
    title: 'Course Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Course Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'L',
    dataIndex: 'l',
    key: 'l'
  },
  {
    title: 'T',
    dataIndex: 't',
    key: 't'
  },
  {
    title: 'P',
    dataIndex: 'p',
    key: 'p'
  },
  {
    title: 'Credits',
    dataIndex: 'credits',
    key: 'credits'
  }
];


const Form7 = () => {
  const [std, setStd] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let std = JSON.parse(localStorage.getItem('std'));
    setStd(std);
    switch (std.branchAlloted) {
      case 'CSE':
        setDataSource(CSEList)
        break;
      case 'IT':
        setDataSource(ITList)
        break;
      case 'ECE':
        setDataSource(ECEList)
        break;
      default:
        break;
    }
  }, []);

  const handleSubmit = () => {
    Axios({
      method: "POST",
      url: "/api/student/updateSteps",
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      },
      data: {
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: true,
      },
    })
      .then((res) => {
        notification["success"]({
          message: "Please refresh and continue to next step.",
        });
        let std = JSON.parse(localStorage.getItem('std'))
        localStorage.setItem('std', JSON.stringify({...std,
          step1: false,
          step2: false,
          step3: false,
          step4: false,
          step5: true,
         }));
         window.location.reload();
      })
      .catch((err) => {
        notification["error"]({
          message:
            "Something went wrong while updating your progress please consult with the administration if problem persists.",
          description: err.response.data.message,
        });
      });
  }

  return (
    <div>
      <div className="field__container">
      <HeaderInfo
        title="Course Registration Form."
      />
      </div>
      <Row justify="center">
        <Col>
          <h3>AY 2020 - 21</h3>
        </Col>
      </Row>
      {!std ? 'Loading...' : (
      <>
      <Row justify="start">
        <Col>
          <h3>Name: Mr. / Mr. : </h3>
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
      </>
      )}
      <Divider />
      <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="sno" />
      <Divider />
      <Row justify="center" gutter={[24, 44]}>
        <Col >
          <Checkbox onChange={(e) => setIsChecked(!isChecked)} />
        </Col>
        <Col >
        <strong>I have read the information and accept.</strong>
        </Col>
        <Col >
          <Button disabled={!isChecked} size="large" type="primary" onClick={handleSubmit}>Submit</Button>
        </Col>
      </Row>
    </div>
  )
}

export default Form7
