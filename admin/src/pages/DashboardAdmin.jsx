import React from 'react';
import { Layout, message, Card, Col, Row, Table, Button, Space } from 'antd';
import '../css/AdminDashboard.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
const { Header } = Layout;

const columns = [
  {
    title: 'S. No.',
    dataIndex: 'sNo',
    key: 'sno',
  },
  {
    title: 'Student Name',
    dataIndex: 'name',
    key: 'code',
  },
  {
    title: 'Reg. number',
    dataIndex: 'regNo',
    key: 'res',
  },
  {
    title: 'Action',
    key: 'fileName',
    render: (text, record) => {
      return <Link to={`/student/${record.sNo}`}> View </Link>
    },
  },
];

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
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      {/* <div style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24 }}>
            {cse.length}          
        </div>
      </div> */}
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
        <Table columns={columns} dataSource={stds} rowKey="regNo" />
        </div>
      {/* <Footer style={{ textAlign: 'center' }}>Portal Created by Cybernauts@IIITU</Footer> */}
    </Layout>
  </Layout>
  )

}


export default DashboardAdmin;
