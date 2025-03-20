import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "../../context/FormProvider";

const PhoneMail: React.FC = () => {
  const { formData, setFieldValue } = useFormContext();

  return (
    <Row className="mb-3">
      <Col>
        <Form.Group controlId="phone">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">+43</InputGroup.Text>
            <Form.FloatingLabel label="Telefonnummer">
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Telefonnummer"
                value={formData.phone || ""}
                onChange={(e) => setFieldValue("phone", e.target.value)}
              />
            </Form.FloatingLabel>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="mail">
          <Form.FloatingLabel label="E-Mail">
            <Form.Control
              type="email"
              name="mail"
              placeholder="E-Mail"
              value={formData.mail || ""}
              onChange={(e) => setFieldValue("mail", e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default PhoneMail;
