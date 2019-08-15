import React from "react";
import styled from "styled-components";

const ContentDiv = styled.div`
  height: calc(100vh - 100px);
  margin: 0;
`;
const ListContent = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    height: 50px;
  }
`;

class Content extends React.Component {
  render() {
    return (
      <ContentDiv>
        <ListContent>
          <p>HI</p>
          {this.props.objOfContentList.results !== undefined &&
            this.props.objOfContentList.results.map(obj => (
              <li>
                <a key={obj.name} onClick={() => this.props.getFields("objOfContentField", obj.url)}>
                  {obj.name}
                </a>
              </li>
            ))}
        </ListContent>
      </ContentDiv>
    );
  }
}

export default Content;
