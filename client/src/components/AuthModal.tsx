import { useEffect, useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { AxiosError } from "axios";
import { useToast } from "../context/ToastProvider";

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";

interface Props {
  authRequired?: boolean;
}

function Auth({ authRequired }: Props) {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const { showError } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleClose = () => {
    if (showLogin) {
      setShowLogin(false);
    }
    if (showRegister) {
      setShowRegister(false);
    }
    if (authRequired) {
      navigate(from, { replace: true });
    }
  };

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      setUserName("");
      setPassword("");
      setRepeatPassword("");
    } catch (err) {
      if (!(err instanceof AxiosError) || !err.response) {
        showError("Register Error", "No Server Response");
      } else if (err.response?.status === 409) {
        showError("Register Error", "Username Taken");
      } else {
        showError("Register Error", "Registration Failed");
      }
    }
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username, roles, accessToken });
      setUserName("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!(err instanceof AxiosError) || !err.response) {
        showError("Login Error", "No Server Response");
      } else if (err.response?.status === 400) {
        showError("Login Error", "Missing Username or Password");
      } else if (err.response?.status === 401) {
        showError("Login Error", "Unauthorized");
      } else {
        showError("Login Error", "Login Failed");
      }
    }
  };

  useEffect(() => localStorage.setItem("persist", String(persist)), [persist]);

  return (
    <>
      <Modal
        show={(showLogin || showRegister) && authRequired && !auth.accessToken}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {showRegister ? "Create an Account" : "Login"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingEmail"
              label="User Name"
              className="mb-3"
            >
              <Form.Control
                type="username"
                placeholder="NoobMaster69"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FloatingLabel>
            {showRegister && (
              <FloatingLabel
                controlId="floatingEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
            )}

            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Form.Check // prettier-ignore
              type="checkbox"
            >
              <Form.Check.Input
                type="checkbox"
                checked={persist}
                onChange={(e) => setPersist(e.target.checked)}
              />
              <Form.Check.Label>Remember Me</Form.Check.Label>
            </Form.Check>

            {showRegister && (
              <FloatingLabel
                controlId="floatingRepeatPassword"
                label="Repeat Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Repeat Password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </FloatingLabel>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (showLogin) {
                setShowLogin(false);
                setShowRegister(true);
              } else {
                setShowLogin(true);
                setShowRegister(false);
              }
            }}
          >
            {showRegister ? "Login" : "Create an Account"}
          </Button>
          <Button
            variant="primary"
            onClick={(e) => (showRegister ? handleRegister(e) : handleLogin(e))}
          >
            {showRegister ? "Create Account" : "Login"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Auth;
