import React, { useState, useEffect } from "react";
import { message, Table, Space, Button, Divider, Row } from "antd";
import Axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";

const DocList = ({ match }) => {
  const [docs, setDocs] = useState([{ sno: "", title: "", res: "" }]);
  const [jeeRegNo, setJeeRegNo] = useState("");
  const [receipts, setReceipts] = useState([
    {
      sno: "I",
      title: "Josaa fee receipt",
      res: "YES",
      fileName: "josaa-fee-Receipt",
    },
    {
      sno: "II",
      title: "Partial fee receipt",
      res: "YES",
      fileName: "partial-fee-Receipt",
    },
    {
      sno: "III",
      title: "Institute fee receipt",
      res: "YES",
      fileName: "institute-fee-Receipt",
    },
  ]);
  const columns = [
    {
      title: "S. No.",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Document Name",
      dataIndex: "title",
      key: "code",
    },
    {
      title: "Response",
      dataIndex: "res",
      key: "res",
    },
    {
      title: "Action",
      key: "fileName",
      render: (text, record) => {
        // console.log(record.fileName);
        let disabled = record.res !== "YES";
        return (
          <>
            <Space size="middle">
              <Button
                onClick={() => getDocument(record.fileName)}
                disabled={disabled}
              >
                View
              </Button>
              <a
                href={`/api/admin/docs/${jeeRegNo}/${record.fileName}`}
                download
              >
                <Button
                  disabled={disabled}
                  type="primary"
                  icon={<DownloadOutlined />}
                  size="middle"
                />
              </a>
            </Space>
          </>
        );
      },
    },
  ];

  const getDocument = (fileName) => {
    window.open(`/api/admin/docs/${jeeRegNo}/${fileName}`, "_blank");
  };
  useEffect(() => {
    Axios({
      method: "get",
      url: `/api/admin/form1/${match.params.regNo}`,
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    })
      .then((res) => {
        setDocs(res.data.docList);
        setJeeRegNo(res.data.jeeRegNo);
      })
      .catch((err) => {
        message.error(err.message);
        setDocs([]);
      });
  }, [jeeRegNo]);
  return (
    <div style={{ maxWidth: "1200px", margin: "auto" }}>
      <Row justify="center">
        <Table
          dataSource={receipts}
          columns={columns}
          pagination={false}
          rowKey="title"
        />
      </Row>
      <Divider />
      <Table
        dataSource={docs}
        columns={columns}
        pagination={false}
        rowKey="sno"
      />
    </div>
  );
};

export default DocList;
