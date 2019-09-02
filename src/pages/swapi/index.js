import React from "react";
import Header from "../../components/swapi/header.js";
import Content from "../../components/swapi/content.js";
import Footer from "../../components/swapi/footer.js";
import NoMatch from "../../components/index404.js";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

class Swapi extends React.Component {
  componentDidMount() {
    this.getFields("objOfHeaderField");
    this.getFields("films", "https://swapi.co/api/films/");
    if (this.state.routeUrl && this.state.routeUrl.includes(this.props.location.pathname)) {
      if (this.props.match.params.id) {
        this.getFields("contentListObj", `${this.state.apiUrl}${this.props.location.pathname.slice(1)}/${this.props.location.search}`);
      }
    }
    if (this.props.location.hash) this.getContent(this.state.contentListObj.results[this.getNumber(this.props.location.hash, this.props.location.search)]);
  }
  componentDidUpdate(prevProps) {
    const { hash, search, pathname } = this.props.location;
    if (
      search !== prevProps.location.search ||
      (this.state.routeUrl &&
        this.state.routeUrl.includes(pathname) &&
        (pathname !== prevProps.location.pathname || (this.props.match.params.id && this.state.contentListObj.results.length === 0)))
    ) {
      this.props.match.params.id ? this.getFields("contentListObj", `${this.state.apiUrl}${pathname.slice(1)}/${search}`) : this.getFields();
    } else if (hash !== prevProps.location.hash) {
      hash ? this.getContent(this.state.contentListObj.results[this.getNumber(hash, search)]) : this.getContent();
    }
  }
  getFields = (stateField, url = this.state.apiUrl) => {
    if (!stateField) {
      this.setState({ contentFieldObj: [], species: {}, contentListObj: { results: [] }, currentUrl: "", speciesUrl: "" });
    } else if ((this.state.loadingUrl !== url || stateField === "species") && this.state.currentUrl !== url) {
      stateField !== "films" && this.setState({ loadingUrl: url, species: {}, speciesUrl: "" });
      stateField === "contentListObj" && this.setState({ contentFieldObj: [] });
      if (url === "https://swapi.co/api/films/" && stateField !== "films") {
        if (this.state.films.results) {
          this.setState(() => ({ [stateField]: this.state.films, currentUrl: "https://swapi.co/api/films/" }));
          this.props.location.hash
            ? this.getContent(this.state.films.results[this.getNumber(this.props.location.hash, this.props.location.search)])
            : this.getContent();
        }
      } else {
        this.getFetch(url).then(val => {
          this.setState(() => {
            let result = {};
            result[stateField] = val;
            if (stateField !== "species" && stateField !== "films") {
              result["currentUrl"] = url;
            } else {
              result["speciesUrl"] = url;
            }
            if (stateField === "objOfHeaderField")
              result.routeUrl = Object.keys(val)
                .map(key => `/${key}`)
                .concat(["/"]);
            return result;
          });
          if (stateField === "contentListObj") {
            this.props.location.hash ? this.getContent(val.results[this.getNumber(this.props.location.hash, this.props.location.search)]) : this.getContent();
          }
        });
      }
    }
  };
  getFetch = async (url = this.state.apiUrl) => {
    const fetchResponce = await fetch(url);
    if (!fetchResponce.ok) throw Error(`Fetch request error ${fetchResponce.status}: ${fetchResponce.statusText}, ${fetchResponce.url}`);
    return await fetchResponce.json();
  };
  state = {
    apiUrl: "https://swapi.co/api/",
    routeUrl: "",
    currentUrl: "",
    loadingUrl: "",
    objOfHeaderField: {},
    contentListObj: {
      results: []
    },
    films: {},
    species: {},
    contentFieldObj: [],
    contentHide: true,
    showSpecies: false
  };
  hideAll = () => {
    this.setState(cur => ({ contentHide: !cur.contentHide, contentFieldObj: [] }));
  };
  getNumber = (hash = 0, search) => {
    return +hash.slice(1) - 10 * (search ? search.split("=")[1] - 1 : 0);
  };
  getSpecies = obj => {
    if (obj.species[0] !== this.state.speciesUrl || !this.state.species.url) {
      this.setState({ species: {}, showSpecies: false, speciesUrl: obj.species[0] });
      this.getFields("species", obj.species[0]);
    }
  };
  getFilms = obj => {
    return (
      <tr key={"films"}>
        <td style={{ maxWidth: "200px" }}>{"films:".toUpperCase()}</td>
        <FilmsContainer>
          {this.state.films.results.map((filmProps, index) => {
            let result;
            if (obj.films.indexOf(filmProps.url) !== -1) {
              result = (
                <LinkFromAttribute
                  key={filmProps.title}
                  to={{
                    pathname: "/films",
                    search: "",
                    hash: `#${index}`
                  }}
                  onClick={() => {
                    this.getFields("contentListObj", "https://swapi.co/api/films/");
                    this.getContent(filmProps);
                  }}
                >
                  {filmProps.title}
                </LinkFromAttribute>
              );
            }
            return result;
          })}
        </FilmsContainer>
      </tr>
    );
  };
  fillContentField = (obj = null) => {
    let result = [];
    if (obj === null || typeof obj !== "object" || Object.keys(obj).length === 0) return this.setState({ contentFieldObj: [], species: {} });
    for (const key in obj) {
      if (arrOffieldNotForDisplay.indexOf(key) === -1)
        result.push(
          <tr key={key}>
            <td style={{ maxWidth: "200px" }}>{key.replace(/_/gi, " ").toUpperCase()}</td>
            <td>{obj[key]}</td>
          </tr>
        );
    }
    obj.films && this.state.films.results && result.push(this.getFilms(obj));
    if (obj.url.includes("people")) {
      this.getSpecies(obj);
    }
    return result;
  };
  getContent = obj => {
    this.setState({ showSpecies: false });
    const result = this.fillContentField(obj);
    this.setState({ contentFieldObj: result });
  };
  viewSpecies = () => {
    this.setState(cur => {
      return { showSpecies: !cur.showSpecies };
    });
  };

  render() {
    return (
      <>
        <Header
          objOfHeaderField={this.state.objOfHeaderField}
          active={this.props.location ? this.props.location.pathname.slice(1) : ""}
          getFields={this.getFields}
          apiUrl={this.state.apiUrl}
        />
        {this.state.routeUrl && !this.state.routeUrl.includes(this.props.location.pathname) ? (
          <NoMatch />
        ) : (
          <Content
            match={this.props.match}
            location={this.props.location}
            films={this.state.films.results}
            apiUrl={this.state.apiUrl}
            contentHide={this.state.contentHide}
            contentListObj={this.state.contentListObj}
            contentFieldObj={this.state.contentFieldObj}
            showSpecies={this.state.showSpecies}
            species={this.state.species}
            fillContentField={this.fillContentField}
            getContent={this.getContent}
            viewSpecies={this.viewSpecies}
            getFields={this.getFields}
          />
        )}
        <Footer hideAll={this.hideAll} contentHide={this.state.contentHide} />
      </>
    );
  }
}

export default Swapi;

// hash && this.state.contentListObj.results ? this.state.contentListObj.results[this.getNumber(this.props.location.hash, search)] : {};
