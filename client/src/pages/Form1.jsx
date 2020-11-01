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
      fileName: 'seat-accesptance-letter',
      title: "Document verification cum Seat Acceptance Letter(ORIGINAL) (Seat upgradation letter,if any) ",
      res: "NO",
    },
    {
      sno: "2",
      fileName: 'jee-main-score-card',
      title: "Jee(Main) score card(Self Attested)",
      res: "NO",
    },
    {
      sno: "3",
      fileName: 'jee-main-admit-card',
      title: "Jee(Main) Admit Card for verification of identity of the candidate(Self Attested)",
      res: "NO",
    },
    {
      sno: "4",
      fileName: '10-marksheet',
      title: "Marksheet/Certificate of Class X[As Date of birth proof](Self Attested)",
      res: "NO",
    },
    {
      sno: "5",
      fileName: '12-marksheet',
      title: "Marksheet and pass Certificate of Class XII(Self Attested)",
      res: "NO",
    },
    {
      sno: "6",
      fileName: "character-certi",
      title: "Conduct/Character Certificate from Head of Institution Last Attended(Self Attested)",
      res: "NO",
    },
    {
      sno: "7",
      fileName: 'transfer-migration',
      title: "Migration/Transfer Certificate(Original)",
      res: "NO",
    },
    {
      sno: "8",
      fileName: 'photo-id-proof',
      title: "Photo ID proof(Self Attested)",
      res: "NO",
    },
    {
      sno: "9",
      fileName: 'form-4-undertaking',
      title: "Form No:04 Undertaking Moral and Disciplinary",
      res: "NO",
    },
    {
      sno: "10",
      fileName: 'form-5-anti-ragging',
      title: "Form No:05 Anti Ragging Affidavits(Students and Parents)",
      res: "NO",
    },
    {
      sno: "11",
      fileName: "form-7",
      title: "Form No:07 Course Registration Form",
      res: "NO",
    },
    {
      sno: "12",
      fileName: "form-8-medical",
      title: "Form No:08 Medical Fitness Certificate(Original)",
      res: "NO",
    },
    {
      sno: "13",
      fileName: "form-9-study-gap",
      title: "Form No:09 Study Gap Affidavit",
      res: "NO",
    },
    {
      sno: "14",
      fileName: 'form-10-category',
      title: "Form No:10 Valid Category Certificate(OBC/EWS/SC/ST) on JoSAA format [OBC-NCL Certificate must be issued on or after April 1,2020](Self Attested) (NOTE:The caste of candidate must be in state-wise central list) ",
      res: "NO",
    },
    {
      sno: "15",
      fileName: "form-11-obl-ncl-undertaking",
      title: "Form No:11 Undertaking in Required Format(for OBC-NCL Candidates Only) (Original)",
      res: "NO",
    },
    {
      sno: "16",
      fileName: "form-11-obl-undertaking",
      title: "Form No:12 Undertaking-OBC",
      res: "NO",
    },
    {
      sno: "17",
      fileName: "form-13-disability",
      title: "Form No:13 Disability Certificate(if any)",
      res: "NO",
    },
    {
      sno: "18",
      fileName: "passport-size-photo",
      title: "Passport size photo of candidate",
      res: "NO",
    },
    {
      sno: "19",
      fileName: "signature",
      title: "Candidate's Signature",
      res: "NO",
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
        });
        let std = JSON.parse(localStorage.getItem('std'))
        localStorage.setItem('std', JSON.stringify({...std,
          step1: false,
          step2: false,
          step3: true,
          step4: false,
          step5: false,
         }));
         alert("Step completed")
         window.location.reload();
    }).catch(err => {
        notification["error"]({
            message: 'Your request failed',
            description: err.response.data.message
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
