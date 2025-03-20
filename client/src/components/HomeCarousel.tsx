import { SetStateAction, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  const handleClick = () => {
    console.log("item clicked", currentItems[index]);
    if (currentItems[index].navigate) {
      navigate(currentItems[index].navigate);
    }
  };

  const currentItems = [
    {
      title: "Ministranten & Jungschaar Lager 2025",
      text: "Ob als Ministrant, bei der Jungschaar oder als Sternsinger, komm mit uns ins Lager 2025.",
      image: "niederstrasserhof.webp",
      navigate: "/lager",
    },
    {
      title: "Die Gruppenleiter",
      text: "Unsere Gruppenleiter in einer Übersicht.",
      image: "church.jpg",
      navigate: "/gruppenleiter",
    },
  ];

  return (
    <Carousel
      onSelect={handleSelect}
      activeIndex={index}
      indicators={false}
      pause={"hover"}
    >
      {currentItems.map((item, index) => (
        <Carousel.Item key={index} interval={3000}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              className="d-block w-100"
              style={{
                height: "400px",
                objectFit: "cover",
                transition: "transform 0.5s",
              }}
              src={item.image}
              alt={item.title}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-body opacity-50"></div>
          </div>
            <Carousel.Caption
            className="text-body bg-body p-3 rounded bg-opacity-75"
            onClick={handleClick}
            style={{ userSelect: "none", cursor: "pointer" }}
            >
            <h1 className="fw-bold">{item.title}</h1>
            <p>{item.text}</p>
            </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
