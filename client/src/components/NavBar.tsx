import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  title: string;
  toggleTheme: () => void;
  theme: string;
};

function NavBar({ title, toggleTheme, theme }: Props) {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [loginState, setLoginState] = useState(true);

  useEffect(() => {
    setLoginState(!!auth.username);
  }, [auth.username]);


  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Navbar
      key="nav"
      expand={true}
      className="bg-body-tertiary mb-3 navbar-header"
    >
      <Container fluid>
        <Navbar.Brand href="/">{title}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav
          className="justify-content-end"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="/home">Link</Nav.Link>
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
              onClick={() => navigate('/home', { state: { from: location } })}
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
            {theme === "light" ? "🌙" : "☀️"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
