import React from 'react'
import { Tabs, Typography } from 'antd';
import RegistrationForm from '../pages/Form3';
import DocumentUpload from './DocumentUpload';
import Downloads from './Downloads';

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
                    <br/> <br/> <Typography.Text>Filename should be of this format only. JEE(MAIN) Registration Number - documentname.</Typography.Text>
                        <br/>
                        <br/>
                        <Typography.Text>e.g. : 2244ee42-caste-certificate.pdf</Typography.Text>
                     <br/>
                     <br/>
                    <DocumentUpload fileName="caste-certificate" title="Caste certificate" />
                    <br/>
                    <DocumentUpload fileName="test" title="12th marksheet" />
                </TabPane>
                <TabPane tab={`Downloads`} key={3} >
                    <Downloads />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Dashboard
