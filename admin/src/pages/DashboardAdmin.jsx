import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import '../css/AdminDashboard.scss';
import StudentInfo from '../components/StudentInfo';
const { Header, Sider } = Layout;

const DashboardAdmin = () =>{

return(
<Layout className="layout__container">
    {/* <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider> */}
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