import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
  display: flex;
  bottom: 0;
  height: 50px;
  background-color: #000;
`;

class Footer extends React.Component {
  render() {
    return <FooterStyled />;
  }
}

export default Footer;
