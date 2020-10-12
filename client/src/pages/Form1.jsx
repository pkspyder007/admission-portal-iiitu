import { Button, Checkbox, notification } from "antd";
import Axios from "axios";
import React, { useState } from "react";
import Field, { DocRow } from "../components/Field";
import "../css/Field.scss";

function Form1() {
  const [isChecked, setIsChecked] = useState(false);

  const [docs, setDocs] = useState([
    {
      sno: "1",
      title: "Jee(Main) score card(self attested)",
      res: "",
    },
    {
      sno: "2",
      title: "Jee(Main) score card(self attested)",
      res: "",
    },
    {
      sno: "3",
      title: "Jee(Main) score card(self attested)",
      res: "",
    },
  ]);

  const changeHandler = (sno, val) => {
    //   console.log(sno, val);
    setDocs((prevState) => {
      prevState[sno - 1].res = val;
      return [...prevState];
    });
  };

  const submitHandler = () => {
    Axios({
      url: "/api/student/form1",
      method: "POST",
      data: docs,
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    }).then(e=>{
        notification["success"]({
            message: 'Form submitted'
        })
    }).catch(err => {
        notification["error"]({
            message: 'Your request failed'
        })
    })
  };

 

  return (
    <>
      <Field>
        {docs.map((doc) => (
          <DocRow
            sno={doc.sno}
            key={doc.sno}
            title={doc.title}
            onChangeHandler={changeHandler}
          />
        ))}
      </Field>
      <br /> <br />
      <div className="review__container">
        <span>
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          I have reviewed the documents submitted.
        </span>
        <Button
          type="primary"
          size="large"
          disabled={!isChecked}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default Form1;
