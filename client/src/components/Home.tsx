import { Button, Container } from "react-bootstrap";
import { useTitle } from "../context/TitleProvider.tsx";
import useAuth from "../hooks/useAuth.tsx";
import HomeCarousel from "./HomeCarousel.tsx";
import { useEffect } from "react";
import { useToast } from "../context/ToastProvider.tsx";

const Home = () => {
  const { auth } = useAuth();
  const { showSuccess } = useToast();

  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Jungschaar Zirl");
  }, [setTitle]);

  return (
    <>
      <HomeCarousel />
      <Container>
        <h2>Herzlich willkommen bei der Jungschaar Zirl</h2>
        <Button onClick={() => showSuccess("Test", "HAHAHA")}>Test</Button>
      </Container>
    </>
  );
};

export default Home;
