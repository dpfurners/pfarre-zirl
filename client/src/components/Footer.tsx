type Props = {
  appWindowSize: number;
};

function Footer({ appWindowSize }: Props) {
  if (appWindowSize > 768)
    return (
      <>
        <p>
          &copy; 2025 Jungschaar Zirl
          {/* {" "}|{" "}<a href="mailto:jungschaar@pfarre.com">Contact Us</a> */}
        </p>
      </>
    );
}

export default Footer;
