import React, { useState, useEffect, createRef } from "react";
import { Divider, Input, Row, Col, message, Button } from "antd";
import { useScreenshot, createFileName } from "use-react-screenshot";
import Axios from "axios";
import { Link } from "react-router-dom";

const { Search } = Input;

export const Info = ({ title, value }) => {
  return (
    <Col className="data-info-col">
      <strong>{title} : </strong>
      <span> &nbsp; {value ?? "--------"}</span>
    </Col>
  );
};

const StudentInfo = (props) => {
  const [std, setStd] = useState({});

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot();

  const download = (image, { name = "img", extension = "png" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  // const getImage = () => takeScreenShot(ref.current);

  function getImage() { 
    window.print() 
} 

  const handleSearch = (regNo) => {
    // message.info("Please wait...");
    Axios({
      method: "get",
      url: `/api/admin/form3/${regNo}`,
      headers: { "x-access-token": localStorage.getItem("x-access-token") },
    })
      .then((res) => {
        setStd(res.data);
      })
      .catch((err) => {
        message.error(err.response.data.message);
        setStd({})
      });
  };

  // useEffect(() => {
  //   if (image) {
  //     download(image, { name: `${std.regNo}-form3`, extension: "png" });
  //   }
  // }, [image]);

  useEffect(() => {
    handleSearch(props.id)
  }, []);

  return (
    <div className="form3">
      {/* <Search
        placeholder="Search By Registration Number"
        enterButton="Search"
        size="large"
        className="hop"
        onSearch={(value) => handleSearch(value)}
      /> */}
      <Divider />
      {/* Header */}
      {std._id && (
        <>
        <div id="GFG" style={{ padding: 24 }} ref={ref}>
          <Row style={{ borderBottom: "none" }} justify="center" gutter={[56, 24]}>
            <Col>
            <img src="https://upload.wikimedia.org/wikipedia/en/c/cf/Iiit-una-logo.png" height="135px" alt="IIIT UNA"/>
            </Col>
            <Col>
              <h2>Indian Institute of Information Technology Una (H.P.) </h2>
              <h2>Transit Campus–II, Chandpur, Haroli, Una-177220 </h2>
              <h1>Data Sheet (Session 2020-21)</h1>
            </Col>
            <Divider />
          </Row>
          {/* Date and Reg No */}
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Date" value={std.date} />
          </Row>
          {/* Name */}
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Name" value={std.name} />
          </Row>
          {/* Email */}
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Email" value={std.email} />
          </Row>
          {/* DOB row */}
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Date of birth" value={std.dob} />
            <Info title="Religion" value={std.religion} />
            <Info title="Gender" value={std.gender} />
            <Info title="Main Category" value={std.mainCategory} />
          </Row>
          {/* Mobile and aadahr row */}
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Student's  Mobile number" value={std.studentMobile} />
            <Info title="Student's AAdhar number" value={std.studentAadharNo} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="You belong to " value={std.areaType} />
            <Info title="State" value={std.state} />
            <Info title="Country" value={std.country} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Correspondence address" value={std.correspondingAddress} />
            <Info title="Correspondence pin" value={std.correspondingPin} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Permanent address" value={std.permanentAddress} />
            <Info title="Permanent pin" value={std.permanentPin} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Nearest Railway Station" value={std.nearestRailwayStation} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="JEE (MAIN) Roll No." value={std.jeeMainRoll} />
            <Info title="JEE (MAIN) Score" value={std.jeeMainScore} />
            <Info title="JEE (MAIN) AIR-CRL" value={std.jeeMainAirCrl} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="JEE (MAIN) AIR-CATEGORY" value={"22"} />
            <Info title="Admitted Category" value={std.jeeMainAirCat} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Country from 10+ 2 passed" value={std.countryFrom12} />
            <Info title="State from 10+ 2 passed" value={std.stateFrom12} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="10+2 Percentage" value={std.percentage12} />
            <Info title="10+ 2 year of passing" value={std.yearPassing12} />
            <Info title="10+ 2 year of passing" value={std.yearPassing12} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Type of School" value={std.typeOfSchool} />
            <Info title="School Area" value={std.areaOfSchool} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Name of 10+2 school" value={std.schoolName12} />
            <Info title="Name of 10+2 board" value={std.board12} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="UG program" value={"B.TECH"} />
            <Info title="Branch" value={std.branch} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Hosteller" value={"YES"} />
            <Info title="Hostel Name" value={std.hostelName} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Father's Name" value={std.fatherName} />
            <Info title="Father's Mobile" value={std.fatherMobile} />
            <Info title="Father's Email" value={std.fatherEmail} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Mother's Name" value={std.motherName} />
            <Info title="Mother's Mobile" value={std.motherMobile} />
            <Info title="Mother's Email" value={std.motherEmail} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Gaurdian's Name" value={std.gaurdianName} />
            <Info title="Gaurdian's Mobile" value={std.gaurdianMobile} />
            <Info title="Gaurdian's Email" value={std.gaurdianEmail} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Annual Family Income" value={std.annualFamilyIncome} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="JoSAA-2020 Amount" value={`₹ ${std.josaaFeeAmount ?? "Not Provided Yet"}`} />
            <Info title="Date" value={std.josaaFeeDate} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info
              title="IIIT UNA Institute Fee Amount"
              value={`₹ ${std.instituteFeeAmount ?? "Not Provided Yet"}`}
            />
            <Info title="Date" value={std.instituteFeeDate} />
            <Info title="Recipt No." value={std.instituteFeeReceiptNo} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Total Amount" value={`₹ ${std.totalFee ?? "Not Provided Yet"}`} />
          </Row>
          <Row justify="space-between" gutter={[48, 24]}>
            <Info title="Hostel Fee Amount" value={`₹ ${std.hostelFeeAmount ?? "Not Provided Yet"}`} />
            <Info title="Date" value={std.hostelFeeDate} />
            <Info title="Recipt No." value={std.hotelFeeReceiptNo} />
          </Row>
        </div>
      <Button type="primary" className="hop" onClick={getImage}>Print</Button> <span> - </span>
      <Link to={`/adminDashboard/docs/${std.regNo}`}>
        <Button type="primary" className="hop">View Docs</Button>
      </Link>
      </>
      )}
      <Divider className="hop" />
    </div>
  );
};

export default StudentInfo;
