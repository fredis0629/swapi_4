import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const arrOffieldNotForDisplay = [
  "homeworld",
  "people",
  "films",
  "species",
  "vehicles",
  "starships",
  "created",
  "edited",
  "url",
  "characters",
  "planets",
  "residents",
  "pilots"
];

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
const FilmsContainer = styled.td`
  display: flex;
  flex-direction: column;
`;
const LinkFromAttribute = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: #000;
  &:hover {
    background-color: #505050;
    color: #00a4ff;
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
  getFields = (stateField, url = this.state.appUrl) => {
    if (!stateField) {
      this.setState({ objOfContentField: {}, objOfContentList: { results: [] }, currentUrl: "" });
    } else if (this.state.currentUrl !== url) {
      url === "https://swapi.co/api/films/"
        ? this.props.films && this.setState(() => ({ [stateField]: { results: this.props.films }, currentUrl: "https://swapi.co/api/films/" }))
        : this.getFetch(url).then(val =>
            this.setState(cur => {
              let result = {};
              result[stateField] = val;
              if (stateField !== "species") result["currentUrl"] = url;
              return result;
            })
          );
    }
  };
  getFetch = async (url = this.props.appUrl) => {
    const fetchResponce = await fetch(url);
    if (!fetchResponce.ok) throw Error(`Fetch request error ${fetchResponce.status}: ${fetchResponce.statusText}, ${fetchResponce.url}`);
    const result = await fetchResponce.json();
    return result;
  };
  getNumber = (hash = 0, search) => {
    return +hash.slice(1) - 10 * (search ? search.split("=")[1] - 1 : 0);
  };

  state = {
    species: {},
    currentUrl: "",
    showSpecies: false,
    objOfContentList: {
      results: []
    },
    objOfContentField: {}
  };
  getSpecies = obj => {
    let result = [];
    if (obj.species[0] !== this.state.species.url) this.getFields("species", obj.species[0]);
    result.push(
      <tr key={"species"}>
        <td style={{ maxWidth: "200px" }}>{"species".toUpperCase()}</td>
        <td>
          {this.state.species ? (
            <>
              <ButtonToAddAttribute
                onClick={() =>
                  this.setState(cur => {
                    return { showSpecies: !cur.showSpecies };
                  })
                }
              >
                {this.state.species.name}
              </ButtonToAddAttribute>
              <Info style={{ display: this.state.showSpecies ? "flex" : "none" }}>
                <tbody>{this.fillContentField(this.state.species)}</tbody>
              </Info>
            </>
          ) : (
            "loading..."
          )}
        </td>
      </tr>
    );
    return result;
  };
  getFilms = obj => {
    return (
      <tr key={"films"}>
        <td style={{ maxWidth: "200px" }}>{"films:".toUpperCase()}</td>
        <FilmsContainer>
          {this.props.films.map((filmProps, index) => {
            if (obj.films.indexOf(filmProps.url) !== -1) {
              return (
                <LinkFromAttribute
                  key={filmProps.title}
                  to={{
                    pathname: "/films",
                    search: "",
                    hash: `#${index}`
                  }}
                >
                  {filmProps.title}
                </LinkFromAttribute>
              );
            }
          })}
        </FilmsContainer>
      </tr>
    );
  };
  fillContentField = (obj = null) => {
    let result = [];
    if (obj === null || typeof obj !== "object" || Object.keys(obj).length === 0) return;
    this.setState({ objOfContentField: obj });
    for (const key in obj) {
      if (arrOffieldNotForDisplay.indexOf(key) === -1)
        result.push(
          <tr key={key}>
            <td style={{ maxWidth: "200px" }}>{key.replace(/_/gi, " ").toUpperCase()}</td>
            <td>{obj[key]}</td>
          </tr>
        );
    }
    obj.films && this.props.films && result.push(this.getFilms(obj));
    if (obj.url.includes("people") && !obj.url.includes("species")) {
      result.push(this.getSpecies(obj));
    }
    return result;
  };
  shouldComponentUpdate(nextProps, nextState) {
    let result = false;
    if ((nextProps.match && !this.props.match) || (!nextProps.match && this.props.match) || (nextProps.match && !nextState.currentUrl)) {
      result = true;
    } else if (
      nextState.currentUrl !== this.state.currentUrl ||
      nextState.objOfContentField.url !== this.state.objOfContentField.url ||
      (nextState.species && nextState.species.url !== this.state.species.url) ||
      nextState.showSpecies !== this.state.showSpecies ||
      nextProps.contentHide !== this.props.contentHide ||
      (nextState.films && !this.state.films)
    ) {
      result = true;
    } else if (
      (nextProps.match && nextProps.match.params.id !== this.props.match.params.id) ||
      (nextProps.rest && nextProps.rest.location.search !== this.props.rest.location.search) ||
      nextProps.rest.location.hash !== this.props.rest.location.hash ||
      (nextProps.rest.location.hash && !this.state.objOfContentField)
    ) {
      result = true;
    }
    return result;
  }
  render() {
    this.props.match
      ? this.getFields("objOfContentList", `${this.props.appUrl + this.props.match.params.id}/${this.props.rest.location.search}`)
      : this.getFields();
    const search = this.props.rest.location.search;
    const hash = this.props.rest.location.hash;
    const objOfContentField =
      hash && this.state.objOfContentList.results ? this.state.objOfContentList.results[this.getNumber(this.props.rest.location.hash, search)] : {};
    return (
      <>
        {this.props.contentHide && (
          <>
            <ListContent>
              {this.state.objOfContentList &&
                this.state.objOfContentList.results !== undefined &&
                this.state.objOfContentList.results.map((obj, index) => (
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
                {this.state.objOfContentList && this.state.objOfContentList.previous && (
                  <LinkPages
                    key={"Previous"}
                    to={{
                      search: this.state.objOfContentList.previous.slice(this.state.objOfContentList.previous.indexOf("?"))
                    }}
                  >
                    Previous
                  </LinkPages>
                )}
                {this.state.objOfContentList && this.state.objOfContentList.next && (
                  <LinkPages
                    key={"Next"}
                    to={{
                      search: this.state.objOfContentList.next.slice(this.state.objOfContentList.next.indexOf("?"))
                    }}
                  >
                    Next
                  </LinkPages>
                )}
              </NavigLinkLi>
            </ListContent>
            <Info>
              <tbody>{this.fillContentField(objOfContentField)}</tbody>
            </Info>
          </>
        )}
      </>
    );
  }
}

export default Content;
