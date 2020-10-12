import React from "react";
import "../css/Field.scss";
import { Form, Input, Checkbox, Radio } from "antd";

function Field({ children }) {
  // const [form] = Form.useForm();
  return (
    <div className="field__container">
      {/* <table>
        <liead className="table__head">
          <li>SNo</li>
          <li>kabckabkjbfkajlfnalnflanlfnalnflnalnl</li>
          <li>Yes</li>
          <li>No</li>
          <li>NA</li>
        </liead>
        <tbody className="table__body">{children}</tbody>
      </table> */}
      <ul>
      <li>SNo</li>
          <li>kabckabkjbfkajlfnalnflanlfnalnflnalnl</li>
          <div style={{display: 'flex',justifyContent:'space-evenly'}}>
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
