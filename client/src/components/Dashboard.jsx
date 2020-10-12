import React from 'react'
import { Tabs, Typography } from 'antd';
import RegistrationForm from '../pages/Form3';
import DocumentUpload from './DocumentUpload';

const { TabPane } = Tabs;

const Dashboard = () => {
    return (
        <div>
            <Tabs defaultActiveKey="2" tabPosition="left" >
                <TabPane tab={`Step 1 - Form 3`} key={1} >
                    <RegistrationForm />
                </TabPane>
                <TabPane tab={`Step 2 - Upload Documents`} key={2} >
                    <Typography.Title type="secondary" level={2}>Upload Your Documents Carefully.</Typography.Title>
                    <Typography.Text>You can download the prescribed doucument format from the Downloads section in the left.</Typography.Text>
                    <br/> <br/> <br/>
                    <DocumentUpload title="Caste certificate" />
                    <br/>
                    <DocumentUpload title="12th marksheet" />
                </TabPane>
                <TabPane tab={`Downloads`} key={3} >
                    <div>Download the requierd document formats</div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Dashboard
