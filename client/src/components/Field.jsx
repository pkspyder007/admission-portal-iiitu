import React from "react";
import "../css/Field.scss";
import { Form, Input, Checkbox, Radio } from "antd";

function Field({ children }) {
  // const [form] = Form.useForm();
  return (
    <div className="field__container">
      <h1>Indian Institute Of Information Technology Una (H.P)</h1>
      <h2>Transit Campus-II Chandpur, Haroli, Una-177220</h2>
      <h3>Btech Admissions</h3>
      <h4>Documents Verification Form</h4>
      <p><strong>NOTE:</strong> Each candidate is required to produce one set of documents/certificates alongwith other credentials given below.
      <strong> A candidate will not be admitted if the original documents/certificates are not produced for verification.</strong> Formats of various certificates/affidavits
      alongwith the instructions are available on the <strong>Institute website and candidates are advised to use the same.</strong></p>
      <ul style={{ fontWeight: "bold" }}>
        <li>SNo</li>
        <li>Details of Documents/Certificates</li>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <li>Yes</li>
          <li>No</li>
          <li>NA</li>
        </div>
      </ul>
      {children}
    </div>
  );
}

export const DocRow = ({ sno, title, onChangeHandler }) => {
  return (
    <ul>
      <li>{sno}</li>
      <li>{title}</li>

      <Radio.Group onChange={(e) => onChangeHandler(sno, e.target.value)}>
        <li>
          <Radio value="YES">Yes</Radio>
        </li>
        <li>
          <Radio value="NO">No</Radio>
        </li>
        <li>
          <Radio value="NA">NA</Radio>
        </li>
      </Radio.Group>
    </ul>
  );
};

export default Field;
