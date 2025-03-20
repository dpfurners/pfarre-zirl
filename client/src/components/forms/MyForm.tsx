// MyForm.tsx
import { useState, ReactNode } from "react";
import { FormProvider } from "../../context/FormProvider";
import InnerForm from "./InnerForm";

interface MyFormProps {
  autoComplete?: boolean;
  resetButton?: boolean;
  formDataName: string;
  fields: string[];
  requiredFields?: string[];
  initialData?: Record<string, string>;
  onSubmit?: (formData: Record<string, string>) => void;
  children?: ReactNode;
}

const MyForm = ({
  autoComplete = false,
  resetButton = true,
  formDataName,
  fields,
  requiredFields = [],
  initialData,
  onSubmit,
  children,
}: MyFormProps) => {
  const [valid, setValid] = useState(false);

  const initialFormData = fields.reduce((acc, field) => {
    acc[field] = initialData?.[field] || "";
    return acc;
  }, {} as Record<string, string>);

  // We'll store the final submission handler in the context-based approach
  const handleSubmit = (formData: Record<string, string>) => {
    if (valid && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <FormProvider
      formDataName={formDataName}
      initialData={initialFormData}
      requiredFields={requiredFields}
    >
      <InnerForm
        autoComplete={autoComplete}
        resetButton={resetButton}
        fields={fields}
        requiredFields={requiredFields}
        onSubmit={handleSubmit}
        onValidateChange={(isValid) => setValid(isValid)}
      >
        {children}
      </InnerForm>
    </FormProvider>
  );
};

export default MyForm;
