import { Row, Col, Form } from "react-bootstrap";
import { useFormContext } from "../../context/FormProvider";

interface Props {
  prefix?: string;
  prefixName?: string;
}



const FullName = ( {prefix, prefixName}: Props) => {
  const { formData, setFieldValue } = useFormContext();

  return (
    <Row className="mb-3">
      <Col>
        <Form.Group controlId={`${prefix ?? ""}firstName`}>
          <Form.FloatingLabel label={`${prefixName ?? ""} Vorname`}>
            <Form.Control
              type="text"
              name={`${prefix ?? ""}firstName`}
              placeholder={`${prefixName ?? ""} Vorname`}
              value={formData[`${prefix ?? ""}firstName`] ?? ""}
              onChange={(e) => setFieldValue(`${prefix ?? ""}firstName`, e.target.value)}
              required
            />
          </Form.FloatingLabel>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group controlId="lastName">
          <Form.FloatingLabel label={`${prefixName ?? ""} Nachname`}>
            <Form.Control
              type="text"
              name={`${prefix ?? ""}lastName`}
              placeholder={`${prefixName ?? ""} Nachname`}
              value={formData[`${prefix ?? ""}lastName`] ?? ""}
              onChange={(e) => setFieldValue(`${prefix ?? ""}lastName`, e.target.value)}
              required
            />
          </Form.FloatingLabel>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default FullName;
