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
      fileName: "form1",
      title: "Form - 1",
      res: "YES",
      required: true,
    },
    {
      sno: "2",
      fileName: "form2",
      title: "Form - 2",
      res: "YES",
      required: true,
    },
    {
      sno: "3",
      fileName: "form3",
      title: "Form - 3",
      res: "YES",
      required: true,
    },
    {
      sno: "4",
      fileName: "form-4",
      title:
        "Form No: 04  (Attach time extension letter (available at institute website), if the document not avialable at present.)",
      res: "YES",
      required: true,
    },
    {
      sno: "5",
      fileName: "form-5",
      title:
        "Form No:05 . (Attach time extension letter (available at institute website), if the document not avialable at present.)",
      res: "YES",
      required: true,
    },
    {
      sno: "6",
      fileName: "form-7",
      title: "Form No: 07",
      res: "YES",
      required: true,
    },

    {
      sno: "7",
      fileName: "form-8",
      title:
        "Form No:08 (Attach time extension letter (available at institute website), if the document not avialable at present.)",
      res: "YES",
      required: true,
    },
    {
      sno: "8",
      fileName: "form-9",
      title:
        "Form No: 09  (Attach time extension letter (available at institute website), if the document not avialable at present.)",
      res: "NA",
      required: false,
    },
    {
      sno: "9",
      fileName: "form-10",
      title: "Form No: 10 ",
      res: "NA",
      required: false,
    },
    {
      sno: "10",
      fileName: "form-11",
      title: "Form No: 11 ",
      res: "NA",
      required: false,
    },
    {
      sno: "11",
      fileName: "form-12",
      title: "Form No: 12 ",
      res: "NA",
      required: false,
    },
    {
      sno: "12",
      fileName: "form-13",
      title: "Form No:13 ",
      res: "NA",
      required: false,
    },
    {
      sno: "13",
      fileName: "form14",
      title: "Form - 14 ",
      res: "NA",
      required: false,
    },
    {
      sno: "14",
      fileName: "form15",
      title: "Form - 15",
      res: "YES",
      required: true,
    },
    {
      sno: "15",
      fileName: "seat-accesptance-letter",
      title:
        "Document verification cum Seat Acceptance Letter(ORIGINAL) (Seat upgradation letter,if any) ",
      res: "YES",
      required: true,
    },
    {
      sno: "16",
      fileName: "jee-main-score-card",
      title: "Jee(Main) score card(Self Attested)",
      res: "YES",
      required: true,
    },
    {
      sno: "17",
      fileName: "jee-main-admit-card",
      title:
        "Jee(Main) Admit Card for verification of identity of the candidate(Self Attested)",
      res: "YES",
      required: true,
    },
    {
      sno: "18",
      fileName: "10-marksheet",
      title:
        "Marksheet/Certificate of Class X[As Date of birth proof](Self Attested)",
      res: "YES",
      required: true,
    },
    {
      sno: "19",
      fileName: "12-marksheet",
      title: "Marksheet and pass Certificate of Class XII(Self Attested)",
      res: "YES",
      required: true,
    },
    {
      sno: "20",
      fileName: "character-certi",
      title:
        "Conduct/Character Certificate from Head of Institution Last Attended(Self Attested)",
      res: "YES",
      required: true,
    },
    {
      sno: "21",
      fileName: "transfer-migration",
      title: "Migration/Transfer Certificate(Original)",
      res: "YES",
      required: true,
    },
    {
      sno: "22",
      fileName: "photo-id-proof",
      title: "Photo ID proof(Self Attested)",
      res: "YES",
      required: true,
    },
    {
      sno: "23",
      fileName: "passport-size-photo",
      title: "Passport size photo of candidate",
      res: "YES",
      required: true,
    },
    {
      sno: "24",
      fileName: "signature",
      title: "Candidate's Signature",
      res: "YES",
      required: true,
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
    })
      .then((e) => {
        notification["success"]({
          message: "Form submitted",
        });
        let std = JSON.parse(localStorage.getItem("std"));
        localStorage.setItem(
          "std",
          JSON.stringify({
            ...std,
            step1: false,
            step2: false,
            step3: true,
            step4: false,
            step5: false,
            cstep: 3,
          })
        );
        localStorage.setItem("cstep", "3");
        alert("Step completed");
        window.location.reload();
      })
      .catch((err) => {
        notification["error"]({
          message: "Your request failed",
          description: err.response.data.message,
        });
      });
  };

  return (
    <>
      <Field>
        {docs.map((doc) => (
          <DocRow
            sno={doc.sno}
            key={doc.sno}
            title={doc.title}
            required={doc.required}
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
          I have reviewed and selected all the documents applicable to me and
          will submit the same in next step.
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
