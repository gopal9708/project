import React from "react";
import { Container } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <Container fluid={true}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{new Date().getFullYear()} © eTechCube.</div>
          <div>Designed & Developed by eTechCube</div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Footer;
