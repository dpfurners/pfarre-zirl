import { useTitle } from "../../context/TitleProvider";
import { useEffect } from "react";
import { Button, Card, Container } from "react-bootstrap";

const Overview = () => {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle(`Lager ${new Date().getFullYear()}`);
  }, [setTitle]);

  return (
    <Container className="vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h1>Einladung zum Lager 2025</h1>
      <h6>Ort: <a href="https://www.jugendhotel-tirol.com/de/" target="_blank" rel="noopener noreferrer">Niederstrasserhof</a></h6>
      <p>
        <strong>Anreise:</strong> 6. Juli 2025
      </p>
      <p>
        <strong>Abreise:</strong> 11. Juli 2025
      </p>
      <p>
        <strong>Wichtig:</strong> Handyverbot während des Lagers!
      </p>
      <Button variant="primary" href="/lager/registration">
        Zur Anmeldung
      </Button>
    </Container>
  );
};

export default Overview;
