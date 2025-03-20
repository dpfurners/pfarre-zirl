import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useFormContext } from "../../context/FormProvider";

const Address: React.FC = () => {
  const { formData, setFieldValue } = useFormContext();

  return (
    <Row>
      <Col xs={12} md={8} xl={4} className="mb-3">
        <Form.Group controlId="street">
          <Form.FloatingLabel label="Straße">
            <Form.Control
              type="text"
              name="street"
              placeholder="Straße"
              value={formData.street || ""}
              onChange={(e) => setFieldValue("street", e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
      </Col>
      <Col xs={12} md={4} xl={2} className="mb-3">
        <Form.Group controlId="addressNumber">
          <Form.FloatingLabel label="Hausnummer">
            <Form.Control
              type="text"
              name="addressNumber"
              placeholder="Hausnummer"
              value={formData.addressNumber || ""}
              onChange={(e) => setFieldValue("addressNumber", e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
      </Col>
      <Col xs={12} md={6} xl={3} className="mb-3">
        <Form.Group controlId="zip">
          <Form.FloatingLabel label="Postleitzahl">
            <Form.Control
              type="text"
              name="zip"
              placeholder="Postleitzahl"
              value={formData.zip || ""}
              onChange={(e) => setFieldValue("zip", e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
      </Col>
      <Col xs={12} md={6} xl={3} className="mb-3">
        <Form.Group controlId="city">
          <Form.FloatingLabel label="Ort">
            <Form.Control
              type="text"
              name="city"
              placeholder="Ort"
              value={formData.city || ""}
              onChange={(e) => setFieldValue("city", e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Address;
