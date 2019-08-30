import React from "react";
import styled from "styled-components";

const ContentDiv = styled.div`
  height: calc(100vh - 100px);
  margin: 0;
  display: flex;
  background: url(https://www.weekendnotes.com/im/002/05/storming-troopers1.jpg);
  background-size: 100% 100%;
  color: white;
  font-size: 5em;
  justify-content: center;
  align-items: center;
  text-shadow: 3px 2px #000;
  p {
    background-color: orange;
  }
`;

class App extends React.Component {
  render() {
    return (
      <ContentDiv>
        <p>Page Not Found</p>
      </ContentDiv>
    );
  }
}

export default App;
