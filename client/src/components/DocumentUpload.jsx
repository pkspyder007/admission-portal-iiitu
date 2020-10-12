import React from 'react';
import { Upload, message, Button } from 'antd';
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
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
      

    return (
        <div>
            <Upload {...uploadProps} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>       
        </div>
    )
}

export default DocumentUpload;
