// Additional.tsx
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "../../context/FormProvider";

interface AdditionalProps {
  fields: string[];
  labels: string[];
  indformation?: string;
}

const Additional: React.FC<AdditionalProps> = ({
  fields,
  labels,
  indformation,
}) => {
  const { formData, setFieldValue } = useFormContext();

  return (
    <div className="mb-3 mt-3">
      {indformation && <Form.Label>{indformation}</Form.Label>}
      {fields.map((fieldName, index) => (
        <Form.Group controlId={fieldName} className="mb-3" key={fieldName}>
          <Form.FloatingLabel label={labels[index]}>
            <Form.Control
              as="text"
              name={fieldName}
              placeholder={labels[index]}
              value={formData[fieldName] || ""}
              onChange={(e) => setFieldValue(fieldName, e.target.value)}
            />
          </Form.FloatingLabel>
        </Form.Group>
      ))}
    </div>
  );
};

export default Additional;
