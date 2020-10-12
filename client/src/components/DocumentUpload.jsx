import React from 'react';
import { Upload, message, Button, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const DocumentUpload = (props) => {
    console.log(`${process.env.REACT_APP_BACKEND}/api/document/upload`);
  let uploadProps ={
    name: 'doc',
    action: `${process.env.REACT_APP_BACKEND}/api/document/upload`,
    headers: {
      'x-access-token': localStorage.getItem('x-access-token'),
    }
  }
  const onFileChange = (info) => {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
      console.log(info.file.percent);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
      

    return (
        <Row gutter="24">
         <Col><p>{props.title}</p></Col>
         <Col>
            <Upload onChange={onFileChange} {...uploadProps} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            </Col>       
        </Row>
    )
}

export default DocumentUpload;
