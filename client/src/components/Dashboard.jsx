import React from 'react'
import { Tabs } from 'antd';
import RegistrationForm from '../pages/Form3';
import DocumentUpload from './DocumentUpload';

const { TabPane } = Tabs;

const Dashboard = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition="left" >
                <TabPane tab={`Form 3`} key={1} >
                    <RegistrationForm />
                </TabPane>
                <TabPane tab={`Upload Documents`} key={2} >
                    <div>Upload</div>
                    <DocumentUpload />
                </TabPane>
                <TabPane tab={`Downloads`} key={3} >
                    <div>Download the requierd document formats</div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Dashboard
