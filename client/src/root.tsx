import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./custom.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { ToastProvider } from "./context/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);
