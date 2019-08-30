import React from "react";
import styled from "styled-components";

const FooterStyled = styled.footer`
  display: flex;
  bottom: 0;
  height: 50px;
  background-color: #000;
`;
const HideButton = styled.button`
  border: none;
  padding: 5px 10px;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 100px 15px 100px 15px;
  &:hover {
    background-color: aliceblue;
    color: crimson;
    border-radius: 15px 100px 15px 100px;
  }
`;
class Footer extends React.Component {
  render() {
    return (
      <FooterStyled>
        <HideButton onClick={() => this.props.hideAll()}>{this.props.contentHide ? "Hide" : "Show"}</HideButton>
      </FooterStyled>
    );
  }
}

export default Footer;
