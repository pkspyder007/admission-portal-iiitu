import React, { useState, useEffect } from 'react'
import { message, Table, Space, Button } from 'antd';
import Axios from 'axios';
import { DownloadOutlined } from '@ant-design/icons';


const DocList = ({match}) => {
  const [docs, setDocs] = useState([{sno: '',title: '', res: ''}]);
  const [jeeRegNo, setJeeRegNo] = useState("");
  const columns = [
    {
      title: 'S. No.',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Document Name',
      dataIndex: 'title',
      key: 'code',
    },
    {
      title: 'Response',
      dataIndex: 'res',
      key: 'res',
    },
    {
      title: 'Action',
      key: 'fileName',
      render: (text, record) => {
        // console.log(record.fileName);
        let disabled = record.res !== "YES"; 
        return (
          <>
          <Space size="middle">
            <Button onClick={() => getDocument(record.fileName)} disabled={disabled}>View</Button>
            <a href={`/api/admin/docs/${jeeRegNo}/${record.fileName}`} download>
            <Button disabled={disabled} type="primary" icon={<DownloadOutlined />} size="middle" />
            </a>
          </Space>
          </>
        )
      },
    },
  ];

  const getDocument = (fileName) => {
    window.open(`/api/admin/docs/${jeeRegNo}/${fileName}`, "_blank")
  }
  useEffect(() => {
    Axios({
      method: "get",
      url: `/api/admin/form1/${match.params.regNo}`,
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    })
      .then((res) => {
        setDocs(res.data.docList);
        setJeeRegNo(res.data.jeeRegNo)
      })
      .catch((err) => {
        message.error(err.message);
        setDocs([])
      });
  }, [jeeRegNo]);
  return (
    <div style={{ maxWidth: "1200px", margin: "auto"}}>
       <Table dataSource={docs} columns={columns} pagination={false} rowKey="sno" />
    </div>
  )
}

export default DocList
