import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Hed = styled.header`
  display: flex;
  width: 100vw;
  justify-content: center;
  background-color: #000;
  height: 50px;
`;
const LinkStyled = styled(Link)`
  cursor: pointer;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isActive ? "#f0f0f0" : "#000")};
  color: ${props => (props.isActive ? "#000" : "#fff")};
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
        {Object.keys(this.props.objOfHeaderField).map(val => (
          <LinkStyled
            key={val}
            to={`/${val}`}
            isActive={val === this.props.active}
            onClick={() => {
              this.props.changeActive(val);
            }}
          >
            {val}
          </LinkStyled>
        ))}
      </Hed>
    );
  }
}

export default Header;
