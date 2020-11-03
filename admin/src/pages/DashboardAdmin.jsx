import React from 'react';
import { Layout, message, Card, Col, Row, Typography } from 'antd';
import '../css/AdminDashboard.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const DashboardAdmin = () =>{

  const [stds, setStds] = useState([]);
  const [cse, setCse] = useState([]);
  const [ece, setEce] = useState([]);
  const [it, setIt] = useState([]);

  useEffect(()=> {
    Axios({
      method: "get",
      url: `/api/admin/all`,
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    })
      .then((res) => {
        setStds(res.data);
        setCse(res.data.filter(s => s.branchAlloted === "CSE"));
        setEce(res.data.filter(s => s.branchAlloted === "ECE"));
        setIt(res.data.filter(s => s.branchAlloted === "IT"));
      })
      .catch((err) => {
        message.error(err.message);
        setStds([])
      });
  }, []);

return(
<Layout className="layout__container">
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
        <Row justify="center">
          <Typography.Title style={{color: "#fff"}}>IIIT UNA</Typography.Title>
        </Row>
        </Header>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="CSE Registrations" bordered={false}>
             <strong> {cse.length}</strong> Students registered.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="ECE Registrations" bordered={false}>
            <strong> {ece.length}</strong> Students registered.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="IT Registrations" bordered={false}>
            <strong> {it.length}</strong> Students registered.
            </Card>
          </Col>
        </Row>
        <Row justify="center">
        </Row>
      </div>
        <div style={{maxWidth: "1000px" , margin: " 24px auto"}}>
        {/* <Table columns={columns} dataSource={stds} rowKey="regNo" /> */}
        <Row justify="space-between" gutter={[24, 48]}>
              <Col ><strong>S.No</strong></Col>
              <Col ><strong>Name</strong></Col>
              <Col ><strong>Reg Number</strong></Col>
              <Col ><strong>View</strong></Col>
            </Row>
        {stds.map(s=> {
          return (
            <Row justify="space-between" gutter={[24, 48]}>
              <Col >{s.sNo}</Col>
              <Col>{s.name}</Col>
              <Col>{s.regNo}</Col>
              <Col><Link to={`/student/${s.sNo}`}> View </Link></Col>
            </Row>
          );
        })}
        </div>
      {/* <Footer style={{ textAlign: 'center' }}>Portal Created by Cybernauts@IIITU</Footer> */}
    </Layout>
  </Layout>
  )

}


export default DashboardAdmin;
