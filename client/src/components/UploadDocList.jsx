import React, { useState, useEffect } from "react";
import { Col, Row, Button, Checkbox, message, notification } from "antd";
import HeaderInfo from "./HeaderInfo";
import DocumentUpload from "./DocumentUpload";
import Axios from "axios";

const UploadDocList = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [docs, setDocs] = useState([]);
  const [reqs, setReqs] = useState([]);

  const afterUpload = (i) => {
    setReqs([...reqs.map((d) => {
      if(d.i === i) {
        return {
          i: d.i,
          u:false
        } 
      } else {
        return d;
      }
    })])
  }

  useEffect(() => {
    message.success("Fetching data...");
    Axios({
      method: "get",
      url: "/api/student/form1",
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    })
      .then((res) => {
        setDocs(res.data.docList);
        let r = [];
        res.data.docList.forEach((d,i) => {
          if(d.res == "YES") {
            r.push({i: i, u: true});
          }
        });
        setReqs(r)
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  }, []);

  const onSubmit = () => {
    let check = reqs.filter(d => d.u !== false);
    // console.log(check.length);
    if(check.length > 0) {
      alert("please upload all documents");
      return;
    } else {
      message.info("Please wait submitting your response.");
    Axios({
      method: "POST",
      url: "/api/student/updateSteps",
      headers: {
        "x-access-token": localStorage.getItem("x-access-token"),
      },
      data: {
        step1: false,
        step2: false,
        step3: true,
        step4: false,
        step5: false,
      },
    })
      .then((res) => {
        notification["success"]({
          message: "Please refresh and continue to next step.",
        });
        let std = JSON.parse(localStorage.getItem("std"));
        localStorage.setItem(
          "std",
          JSON.stringify({
            ...std,
            step1: false,
            step2: false,
            step3: false,
            step4: true,
            step5: false,
          })
        );
        alert("Step completed")
        window.location.reload();
      })
      .catch((err) => {
        notification["error"]({
          message:
            "Something went wrong while updating your progress please consult with the administration if problem persists.",
          description: err.response.data.message,
        });
      });
    }
    
  };
  return (
    <div>
      <div className="field__container">
        <HeaderInfo
          title="Document Upload Section"
          note={`
                        <strong>NOTE:</strong> Each candidate is required to produce one set of documents/certificates alongwith other credentials given below.
                        <strong> A candidate will not be admitted if the original documents/certificates are not produced for verification.</strong> Formats of various certificates/affidavits
                        alongwith the instructions are available on the <strong>Institute website/Downloads section and candidates are advised to use the same.</strong>
                        `}
        />
      </div>

      {docs.length === 0 ? (
        <Row justify="center" gutter={[16, 24]}>
          <Col>
            <h3>Loading document list. Please refresh if not loaded.</h3>
          </Col>
        </Row>
      ) : (
        ""
      )}

      {docs.map((doc, i) => {
        if (doc.res === "YES") {
          return (
            <Row key={doc.sno} justify="center" gutter={[16, 24]}>
              <Col>
                <DocumentUpload fileName={doc.fileName} title={doc.title} afterUpload={() => afterUpload(i)} />
              </Col>
            </Row>
          );
        } else {
          return "";
        }
      })}

      {/* {docs.length === 0 ? (
        ""
      ) : (
        <>
          <Row justify="center" gutter={[16, 24]}>
            <Col>
              <DocumentUpload
                fileName="passport-size-photo"
                title="Candidate's passport size photograph"
              />
            </Col>
          </Row>
          <Row justify="center" gutter={[16, 24]}>
            <Col>
              <DocumentUpload
                fileName="signature"
                title="Candidate's Signature"
              />
            </Col>
          </Row>
        </>
      )} */}

      {/* <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form1"
            title="Form 1 - Document Verification Form (Scanned Copy)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="acceptance-letter"
            title="Document verification cum Seat Acceptance Letter(ORIGINAL) (Seat upgradation letter,if any)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="jee-main-scorecard"
            title="Jee(Main) score card(Self Attested)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="jee-main-admit-card"
            title="Jee(Main) Admit Card for verification of identity of the candidate(Self Attested)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="dob-proof"
            title="Marksheet/Certificate of Class X[As Date of birth proof](Self Attested)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="marksheet-12"
            title="Marksheet and pass Certificate of Class XII(Self Attested)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="character-certificate"
            title="Conduct/Character Certificate from Head of Institution Last Attended(Self Attested)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="migration-certificate"
            title="Migration/Transfer Certificate(Original)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="photo-id-proof"
            title="Photo ID proof(Self Attested)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-2-fee"
            title="Form No:02 Fee Payment Form"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-3-data-sheet"
            title="Form No:03 Data Sheet"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-4"
            title="Form No:04 Undertaking Moral and Disciplinary"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-5"
            title="Form No:05 Anti Ragging Affidavits(Students and Parents)(02 copies each)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-6"
            title="Form No:06 Institute Admit Card"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-7"
            title="Form No:07 Course Registration Form"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-8"
            title="Form No:08 Medical Fitness Certificate(Original)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="category-certificate"
            title="Form No:10 Valid Category Certificate"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-11"
            title="Form No:11 Undertaking in Required Format(for OBC-NCL Candidates Only) (Original)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-12"
            title="Form No:12 Undertaking-OBC"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload
            fileName="form-13"
            title="Form No:13 Disability Certificate(if any)"
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload fileName="photo" title="Passport Size Photograph" />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 24]}>
        <Col>
          <DocumentUpload fileName="signature" title="Signature" />
        </Col>
      </Row> */}
      <div className="review__container">
        <span>
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          >
            I have reviewed the documents and want to finalize these documents.
          </Checkbox>
        </span>
        <Button
          type="primary"
          size="large"
          disabled={!isChecked}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UploadDocList;
