import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
`;
const LinkPages = styled(Link)`
  cursor: pointer;
  height: inherit;
  display: flex;
  align-items: center;
  background-color: #255070cc;
  text-align: center;
  padding: 0 10px;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  color: #000;
  &:hover {
    background-color: #505050;
    color: #00a4ff;
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
  getUpdate = async url => await this.props.getFields("objOfContentList", url);
  render() {
    return (
      <>
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
                  <LinkPages
                    key={"Previous"}
                    to={{
                      //pathname: this.props.objOfContentList.previous.slice(this.props.appUrl.length, this.props.objOfContentList.previous.indexOf("?")),
                      search: this.props.objOfContentList.previous.slice(this.props.objOfContentList.previous.indexOf("?"))
                    }}
                    onClick={() => this.getUpdate(this.props.objOfContentList.previous)}
                  >
                    Previous
                  </LinkPages>
                )}
                {this.props.objOfContentList.next && (
                  <LinkPages
                    key={"Next"}
                    to={{
                      //pathname: this.props.objOfContentList.next.slice(this.props.appUrl.length, this.props.objOfContentList.next.indexOf("?")),
                      search: this.props.objOfContentList.next.slice(this.props.objOfContentList.next.indexOf("?"))
                    }}
                    onClick={() => this.getUpdate(this.props.objOfContentList.next)}
                  >
                    Next
                  </LinkPages>
                )}
              </NavigLinkLi>
            </ListContent>
            <Info>{this.props.objOfContentField}</Info>
          </>
        )}
      </>
    );
  }
}

export default Content;
