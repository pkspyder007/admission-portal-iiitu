import React from 'react';
import { Upload, message, Button, Row, Col, notification, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const DocumentUpload = (props) => {
  let uploadProps ={
    name: 'doc',
    action: `/api/document/upload`,
    headers: {
      'filename': props.fileName,
      'x-access-token': localStorage.getItem('x-access-token'),
    }
  }

  const beforeUpload = (file) => {
    // file.name = "hey.jpg"
    // return true;
    if(file.size/(1024*1024) > 2) {
      notification["error"]({
        message: "Please select a file under 2 MB.",
        // description: "Filesize is greater than 2 MB."
      })
      return false;
    } else {
      return true;
    }
  }
  const onFileChange = (info) => {

    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
      console.log(info.file.percent);
    }
    if (info.file.status === 'done') {
      if(props.afterUpload) {
        props.afterUpload(true);
      }
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
      

    return (
        <Row justify="space-between" gutter="24">
         <Col><p>{props.title}</p></Col>
         <Col>
            <Upload beforeUpload={beforeUpload} onChange={onFileChange} {...uploadProps} accept=".jpg,.jpeg,.png,.pdf">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            </Col>   
            <Divider />    
        </Row>
    )
}

export default DocumentUpload;
