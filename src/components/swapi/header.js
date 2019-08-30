import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Hed = styled.header`
  display: flex;
  width: 100vw;
  justify-content: center;
  background-color: #000;
  height: 50px;
`;
const LinkStyled = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isactive ? "#f0f0f0" : "#000")};
  color: ${props => (props.isactive ? "#000" : "#fff")};
  padding: 0 10px;
  border: none;
  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

class Header extends React.Component {
  render() {
    return (
      <Hed>
        <LinkStyled key="Home" to={``} isactive={`` === this.props.active ? "active" : ""} onClick={() => this.props.getFields()}>
          Home
        </LinkStyled>
        {Object.keys(this.props.objOfHeaderField).map(val => (
          <LinkStyled
            key={val}
            to={`/${val}`}
            onClick={() => this.props.getFields("contentListObj", `${this.props.apiUrl}${val}/`)}
            isactive={val === this.props.active ? "active" : ""}
          >
            {val}
          </LinkStyled>
        ))}
      </Hed>
    );
  }
}

export default Header;
