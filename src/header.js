import React from "react";
import styled from "styled-components";

const Hed = styled.header`
  display: flex;
  width: "100wv";
  justify-content: center;
  background-color: #000;
  a {
    cursor: pointer;
    height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    background-color: #000;
    color: #fff;
    padding: 0 10px;
  }
  a:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

class Header extends React.Component {
  render() {
    return (
      <Hed>
        {Object.keys(this.props.objOfHeaderField).map(val => (
          <a key={val} onClick={() => this.props.getFields("objOfContentList", this.props.objOfHeaderField[val])}>
            {val}
          </a>
        ))}
      </Hed>
    );
  }
}

export default Header;
