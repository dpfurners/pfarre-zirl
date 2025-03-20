// Birthday.tsx
import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "../../context/FormProvider";

const Birthday: React.FC = () => {
  const { formData, setFieldValue } = useFormContext();

  return (
    <Form.Group className="mb-3 mt-3" controlId="birthday">
      <Form.FloatingLabel label="Geburtstag">
        <Form.Control
          type="date"
          name="birthday"
          placeholder="Geburtstag"
          value={formData.birthday || ""}
          onChange={(e) => setFieldValue("birthday", e.target.value)}
        />
      </Form.FloatingLabel>
    </Form.Group>
  );
};

export default Birthday;
