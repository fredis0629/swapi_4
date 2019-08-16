import React from "react";
import styled from "styled-components";

const ContentDiv = styled.div`
  height: calc(100vh - 100px);
  margin: 0;
  display: flex;
  background: url(https://www.weekendnotes.com/im/002/05/storming-troopers1.jpg);
  background-size: 100% 100%;
  ul {
    height: 100%;
  }
`;
const ListContent = styled.ul`
  display: flex;
  flex-direction: column;
  width: 300px;
  li {
    height: 50px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    button {
      cursor: pointer;
      height: inherit;
      display: flex;
      align-items: center;
      background-color: #255070cc;
      text-align: center;
      padding: 0 10px;
      width: 100%;
      border: none;
      color: #000;
    }
    button:hover {
      background-color: #505050;
      color: #00a4ff;
    }
  }
`;
const NavigLinkLi = styled.li`
  display: flex;
  button {
    border: none;
    flex-grow: 1;
    justify-content: center;
    color: #000;
  }
`;
const Info = styled.table`
  flex-grow: 1;
  height: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: calc(100vw - 300px);
  tr {
    min-height: 30px;
    width: 100%;
    display: flex;
    background-image: linear-gradient(90deg, #ff7f50, #ff7f5000);
    th {
      min-width: 100px;
      text-align: left;
      padding: 5px 10px;
    }
  }
`;

class Content extends React.Component {
  render() {
    return (
      <ContentDiv>
        {this.props.contentHide && (
          <>
            <ListContent>
              {this.props.objOfContentList.results !== undefined &&
                this.props.objOfContentList.results.map(obj => (
                  <li>
                    <button key={obj.name || obj.title} onClick={() => this.props.fillContentField(obj)}>
                      {obj.name || obj.title}
                    </button>
                  </li>
                ))}
              <NavigLinkLi>
                {this.props.objOfContentList.previous && (
                  <button key={"Previous"} onClick={() => this.props.getFields("objOfContentList", this.props.objOfContentList.previous)}>
                    Previous
                  </button>
                )}
                {this.props.objOfContentList.next && (
                  <button key={"Next"} onClick={() => this.props.getFields("objOfContentList", this.props.objOfContentList.next)}>
                    Next
                  </button>
                )}
              </NavigLinkLi>
            </ListContent>
            <Info>{this.props.objOfContentField}</Info>
          </>
        )}
      </ContentDiv>
    );
  }
}

export default Content;
