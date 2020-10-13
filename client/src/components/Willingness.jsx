import React, {useState} from "react";
import { Row, Col, Radio, Button, Divider, notification} from "antd";
import HeaderInfo from "./HeaderInfo";

const Willingness = () => {
  const [will, setWill] = useState(null);

  const onSubmit = () => {
    if(!will) {
      notification["error"]({
        message: 'Please Select an option.'
      });
      return;
    }
  }
  
  const onChange = e => {
    setWill(e.target.value);
  }

  return (
    <>
      <div className="field__container">
        <HeaderInfo
          title="Freeze OR Float"
          note={`
            <strong>
              Note:
            </strong>
            Please select the option carefully.
          `}
        />
      </div>
      <Row justify="center">
      <Col>
        <Radio.Group onChange={onChange} value={will}>
          <Radio value="FREEZE">FREEZE</Radio>
          <Radio value="FLOAT">FLOAT</Radio>
        </Radio.Group>
      </Col>
    </Row>
    <Divider />
    <Row justify="center">
      <Button type="primary" size="large" onClick={onSubmit}>Submit</Button>
    </Row>
    </>
  );
};

export default Willingness;
