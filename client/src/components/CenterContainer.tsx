import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const CenterContainer = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default CenterContainer;
