import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useFormContext } from "../../context/FormProvider";

const ParentType: React.FC = () => {
  // Access centralized formData and setFieldValue from context
  const { formData, setFieldValue } = useFormContext();

  return (
    <Row className="mb-3">
      <Col>
        <Form.FloatingLabel label="Erziehungsberechtigten">
          <Form.Select
            aria-label="Default select example"
            aria-describedby="parentType"
            required
            name="parentType"
            /* Pull the value from context. If undefined, fall back to "" */
            value={formData.parentType || ""}
            /* Update context on change */
            onChange={(e) => setFieldValue("parentType", e.target.value)}
          >
            <option value="mother">Mutter</option>
            <option value="father">Vater</option>
            <option value="grandparent">Großeltern</option>
            <option value="other">Andere</option>
          </Form.Select>
        </Form.FloatingLabel>
      </Col>

      {/* Conditionally show the text input if "other" is selected */}
      {formData.parentType === "other" && (
        <Col>
          <Form.FloatingLabel label="Wer ist der Erziehungsberechtigte?">
            <Form.Control
              type="text"
              name="otherParentType"
              placeholder="Wer ist der Erziehungsberechtigte?"
              required
              /* Controlled input from context */
              value={formData.otherParentType || ""}
              /* Update context on change */
              onChange={(e) => setFieldValue("otherParentType", e.target.value)}
            />
          </Form.FloatingLabel>
        </Col>
      )}
    </Row>
  );
};

export default ParentType;
