import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

// Extend the ToastType to include "primary"
export type ToastType = "success" | "error" | "warning" | "info" | "primary";

interface ToastMessage {
  title?: string;
  message: string;
  show: boolean;
  type?: ToastType;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, "show">) => void;
  hideToast: () => void;
  showError: (title: string, message: string) => void;
  showSuccess: (title: string, message: string) => void;
  showPrimary: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Generic function to show a toast
  const showToast = (toastData: Omit<ToastMessage, "show">) => {
    setToast({ ...toastData, show: true });
  };

  const hideToast = () => {
    setToast((prev) => (prev ? { ...prev, show: false } : null));
    // Optionally clear the toast after the hide animation
    setTimeout(() => setToast(null), 300);
  };

  // Specialized functions for different toast types
  const showError = (title: string, message: string) => {
    showToast({ title, message, type: "error" });
  };

  const showSuccess = (title: string, message: string) => {
    showToast({ title, message, type: "success" });
  };

  const showPrimary = (title: string, message: string) => {
    showToast({ title, message, type: "primary" });
  };

  const showInfo = (title: string, message: string) => {
    showToast({ title, message, type: "info" });
  };

  // Map toast type to bootstrap background classes
  const getToastClass = (type?: ToastType) => {
    switch (type) {
      case "success":
        return "bg-success text-white";
      case "error":
        return "bg-danger text-white";
      case "warning":
        return "bg-warning";
      case "info":
        return "bg-info text-white";
      case "primary":
        return "bg-primary text-white";
      default:
        return "";
    }
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
        showError,
        showSuccess,
        showPrimary,
        showInfo,
      }}
    >
      {children}
      <ToastContainer position="bottom-end">
        {toast && (
          <Toast
            onClose={hideToast}
            show={toast.show}
            delay={3000}
            autohide
            className={getToastClass(toast.type)}
          >
            {toast.title && (
              <Toast.Header closeButton={false}>
                <strong className="me-auto">{toast.title}</strong>
              </Toast.Header>
            )}
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export default ToastContext;
