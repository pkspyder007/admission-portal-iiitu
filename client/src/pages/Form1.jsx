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
      title: "Form No. 01: Document Verification Form",
      res: "",
    },
    {
      sno: "2",
      title: "Document verification cum Seat Acceptance Letter(ORIGINAL) (Seat upgradation letter,if any) along with 4 number of color photographs",
      res: "",
    },
    {
      sno: "3",
      title: "Jee(Main) score card(Self Attested)",
      res: "",
    },
    {
      sno: "4",
      title: "Jee(Main) Admit Card for verification of identity of the candidate(Self Attested)",
      res: "",
    },
    {
      sno: "5",
      title: "Marksheet/Certificate of Class X[As Date of birth proof](Self Attested)",
      res: "",
    },
    {
      sno: "6",
      title: "Marksheet and pass Certificate of Class XII(Self Attested)",
      res: "",
    },
    {
      sno: "7",
      title: "Conduct/Character Certificate from Head of Institution Last Attended(Self Attested)",
      res: "",
    },
    {
      sno: "8",
      title: "Migration/Transfer Certificate(Original)",
      res: "",
    },
    {
      sno: "9",
      title: "Photo ID proof(Self Attested)",
      res: "",
    },
    {
      sno: "10",
      title: "Form No:02 Fee Payment Form",
      res: "",
    },
    {
      sno: "11",
      title: "Form No:03 Data Sheet",
      res: "",
    },
    {
      sno: "12",
      title: "Form No:04 Undertaking Moral and Disciplinary",
      res: "",
    },
    {
      sno: "13",
      title: "Form No:05 Anti Ragging Affidavits(Students and Parents)(02 copies each)",
      res: "",
    },
    {
      sno: "14",
      title: "Form No:06 Institute Admit Card",
      res: "",
    },
    {
      sno: "15",
      title: "Form No:07 Course Registration Form",
      res: "",
    },
    {
      sno: "16",
      title: "Form No:08 Medical Fitness Certificate(Original)",
      res: "",
    },
    {
      sno: "17",
      title: "Form No:09 Study Gap Affidavit",
      res: "",
    },
    {
      sno: "18",
      title: "Form No:10 Valid Category Certificate(OBC/EWS/SC/ST) on JoSAA format [OBC-NCL Certificate must be issued on or after April 1,2020](Self Attested) (NOTE:The caste of candidate must be in state-wise central list) ",
      res: "",
    },
    {
      sno: "19",
      title: "Form No:11 Undertaking in Required Format(for OBC-NCL Candidates Only) (Original)",
      res: "",
    },
    {
      sno: "20",
      title: "Form No:12 Undertaking-OBC",
      res: "",
    },
    {
      sno: "21",
      title: "Form No:13 Disability Certificate(if any)",
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
