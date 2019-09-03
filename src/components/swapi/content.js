import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImage from "../../image/storming-troopers1.jpg";

const ContentDiv = styled.div`
  height: calc(100vh - 100px);
  margin: 0;
  display: flex;
  background-image: url(${backgroundImage});
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
  }
`;
const NavigLinkLi = styled.li`
  display: flex;
`;
const LinkPages = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  height: inherit;
  display: flex;
  align-items: center;
  background-color: ${props => (props.isactive ? "#505050" : "#255070cc")};
  text-align: center;
  padding: 0 10px;
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  color: ${props => (props.isactive ? "#00a4ff" : "#000")};
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
    td {
      min-width: 100px;
      text-align: left;
      padding: 5px 10px;
    }
  }
`;
const ButtonToAddAttribute = styled.button`
  cursor: pointer;
  height: 20px;
  display: flex;
  align-items: center;
  background-color: #255070cc;
  text-align: center;
  padding: 0 10px;
  border: none;
  color: #000;
  font-size: 1em;
  &:hover {
    background-color: #505050;
    color: #00a4ff;
  }
`;

class Content extends React.Component {
  getSpecies = () => {
    return (
      <tr key={"species"}>
        <td style={{ maxWidth: "200px" }}>{"species".toUpperCase()}</td>
        <td>
          {this.props.species ? (
            <>
              <ButtonToAddAttribute onClick={() => this.props.viewSpecies()}>{this.props.species.name}</ButtonToAddAttribute>
              <Info style={{ display: this.props.showSpecies ? "flex" : "none" }}>
                <tbody>{this.props.fillContentField(this.props.species)}</tbody>
              </Info>
            </>
          ) : (
            "loading..."
          )}
        </td>
      </tr>
    );
  };
  render() {
    const search = this.props.location.search;
    const hash = this.props.location.hash;
    return (
      <ContentDiv>
        {this.props.contentHide && (
          <>
            <ListContent>
              {this.props.contentListObj &&
                this.props.contentListObj.results !== undefined &&
                this.props.contentListObj.results.map((obj, index) => (
                  <li key={obj.name || obj.title}>
                    <LinkPages
                      isactive={hash === `#${index + 10 * (search ? search.split("=")[1] - 1 : 0)}` ? 1 : 0}
                      to={{
                        search: search,
                        hash: `#${index + 10 * (search ? search.split("=")[1] - 1 : 0)}`
                      }}
                    >
                      {obj.name || obj.title}
                    </LinkPages>
                  </li>
                ))}
              <NavigLinkLi>
                {this.props.contentListObj && this.props.contentListObj.previous && (
                  <LinkPages
                    key={"Previous"}
                    to={{
                      search: this.props.contentListObj.previous.slice(this.props.contentListObj.previous.indexOf("?"))
                    }}
                  >
                    Previous
                  </LinkPages>
                )}
                {this.props.contentListObj && this.props.contentListObj.next && (
                  <LinkPages
                    key={"Next"}
                    to={{
                      search: this.props.contentListObj.next.slice(this.props.contentListObj.next.indexOf("?"))
                    }}
                  >
                    Next
                  </LinkPages>
                )}
              </NavigLinkLi>
            </ListContent>
            <Info>
              <tbody>
                {this.props.contentFieldObj}
                {this.props.species.url && this.getSpecies()}
              </tbody>
            </Info>
          </>
        )}
      </ContentDiv>
    );
  }
}

export default Content;
