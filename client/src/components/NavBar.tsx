import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTitle } from "../context/TitleProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

type Props = {
  appWindowSize: number;
  toggleTheme: () => void;
  theme: string;
};

function NavBar({ appWindowSize, toggleTheme, theme }: Props) {
  const { auth } = useAuth();
  const { title } = useTitle();

  const navigate = useNavigate();
  const location = useLocation();

  const [loginState, setLoginState] = useState(true);

  useEffect(() => {
    setLoginState(!!auth.username);
  }, [auth.username]);

  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <Navbar
        key="nav"
        expand={true}
        fixed={appWindowSize < 768 ? "bottom" : "top"}
        className="bg-body-tertiary"
        style={{ zIndex: 1000 }}
      >
        <Container fluid>
          <Navbar.Brand href="/">{title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav
            className="justify-content-end"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/home">Home</Nav.Link>
            {loginState ? (
              <Button
                as={NavItem}
                variant="outline-secondary"
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            ) : (
              <Button
                as={NavItem}
                variant="outline-primary"
                onClick={() => navigate("/home", { state: { from: location } })}
              >
                {/* <Navigate to="/home" /> */}
                Login
              </Button>
            )}
            <Button
              as={NavItem}
              className="ms-2"
              variant="outline-secondary"
              onClick={() => toggleTheme()}
            >
              {theme === "light" ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                <FontAwesomeIcon icon={faSun} style={{ color: "#FFD43B" }} />
              )}
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <div style={{ height: "56px" }}></div>
    </>
  );
}

export default NavBar;
