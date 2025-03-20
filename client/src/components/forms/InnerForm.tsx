// MyForm.tsx (continuing from above)

import { ReactNode, useEffect, useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useFormContext } from "../../context/FormProvider";

// This interface is just for the <InnerForm> props
interface InnerFormProps {
  autoComplete: boolean;
  resetButton: boolean;
  fields: string[];
  requiredFields: string[];
  onSubmit?: (formData: Record<string, string>) => void;
  onValidateChange: (isValid: boolean) => void;
  children?: ReactNode;
}

const InnerForm = ({
  autoComplete,
  resetButton,
  fields,
  requiredFields,
  onSubmit,
  onValidateChange,
  children,
}: InnerFormProps) => {
  const { formData, setFieldValue, clearFieldValues } = useFormContext();

  const [allRequiredFilled, setAllRequiredFilled] = useState(false);

  // On mount or on formData change, run validation
  useEffect(() => {
    setAllRequiredFilled(requiredFields.every(
      (field) => formData[field]?.trim() !== ""
    ));
    onValidateChange(allRequiredFilled);
  }, [formData, requiredFields, onValidateChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allRequiredFilled = requiredFields.every(
      (field) => formData[field]?.trim() !== ""
    );
    if (allRequiredFilled && onSubmit) {
      clearFieldValues();
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    // Set every field to ""
    fields.forEach((field) => setFieldValue(field, ""));
  };

  return (
    <Form autoComplete={autoComplete ? "on" : "off"} onSubmit={handleSubmit}>
      {children}

      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip>Bitte füllen Sie alle Felder aus</Tooltip>}
      >
        <span className="d-inline-block">
          <Button
            variant="primary"
            type="submit"
            className="mb-3 me-3"
            // If required fields are incomplete, disable Submit
            disabled={allRequiredFilled}
          >
            Submit
          </Button>
        </span>
      </OverlayTrigger>

      {resetButton && (
        <Button
          variant="outline-danger"
          type="button"
          className="mb-3"
          onClick={handleReset}
        >
          Zurücksetzen
        </Button>
      )}
    </Form>
  );
};

export default InnerForm;
