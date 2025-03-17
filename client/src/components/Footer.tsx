type Props = {
  appWindowSize: number;
};

function Footer({ appWindowSize }: Props) {
  if (appWindowSize > 768)
    return (
      <>
        <p>
          &copy; 2025 Daniel Pfurner |{" "}
          <a href="mailto:dpfurner@gmail.com">Contact Us</a>
        </p>
      </>
    );
}

export default Footer;
