// FormContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface FormData {
  [key: string]: string;
}

interface FormContextProps {
  formData: FormData;
  clearFieldValues: () => void;
  setFieldValue: (fieldName: string, value: string) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

interface FormProviderProps {
  formDataName: string;
  initialData?: FormData;
  children: ReactNode;
  requiredFields?: string[];
}

// Provider that holds the entire form state and syncs it to localStorage
export const FormProvider = ({
  formDataName,
  initialData = {},
  requiredFields = [],
  children,
}: FormProviderProps) => {
  const [formData, setFormData] = useState<FormData>(() => {
    // Load from localStorage, or use initialData if not found
    const saved = localStorage.getItem(formDataName);
    return saved ? JSON.parse(saved) : initialData;
  });

  // Save any updates to localStorage
  useEffect(() => {
    localStorage.setItem(formDataName, JSON.stringify(formData));
  }, [formData, formDataName]);

  // Provide a setter function for child components
  const setFieldValue = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const clearFieldValues = () => {
    setFormData({});
  };

  // The value that all child components can read
  const contextValue: FormContextProps = {
    formData,
    setFieldValue,
    clearFieldValues,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

// Custom Hook to consume the FormContext
export const useFormContext = (): FormContextProps => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
