import React from "react";
import styled from "styled-components";

const Hed = styled.header`
  display: flex;
  width: 100vw;
  justify-content: center;
  background-color: #000;
  height: 50px;
  button {
    cursor: pointer;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    background-color: #000;
    color: #fff;
    padding: 0 10px;
    border: none;
  }
  button:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

class Header extends React.Component {
  render() {
    return (
      <Hed>
        {Object.keys(this.props.objOfHeaderField).map(val => (
          <button key={val} onClick={() => this.props.getFields("objOfContentList", this.props.objOfHeaderField[val])}>
            {val}
          </button>
        ))}
      </Hed>
    );
  }
}

export default Header;
