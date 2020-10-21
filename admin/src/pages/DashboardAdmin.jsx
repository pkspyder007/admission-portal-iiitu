import React from 'react';
import { Layout } from 'antd';
import '../css/AdminDashboard.scss';
import StudentInfo from '../components/StudentInfo';
const { Header } = Layout;

const DashboardAdmin = () =>{

return(
<Layout className="layout__container">
    <Layout>
      <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
      <div style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24 }}>
          <StudentInfo />
        </div>
      </div>
      {/* <Footer style={{ textAlign: 'center' }}>Portal Created by Cybernauts@IIITU</Footer> */}
    </Layout>
  </Layout>
  )

}


export default DashboardAdmin;
