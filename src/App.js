import React from "react";
import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

class App extends React.Component {
  constructor() {
    super();
    this.getFields("objOfHeaderField");
    this.getFields("films", "https://swapi.co/api/films/");
  }
  state = {
    appUrl: "https://swapi.co/api/",
    objOfHeaderField: {},
    objOfContentList: {
      results: []
    },
    additionalInformation: {},
    objOfContentField: {},
    contentHide: true,
    active: "",
    search: "",
    hash: "",
    currentUrl: "",
    films: {}
  };
  getFields = (stateField, url = this.state.appUrl) => {
    if (this.state.currentUrl !== url) {
      this.setState({ currentUrl: url });
      this.getFetch(url).then(val => this.setState(() => ({ [stateField]: val })));
    }
  };
  getFetch = async (url = this.state.appUrl) => {
    const fetchResponce = await fetch(url);
    if (!fetchResponce.ok) throw Error(`Fetch request error ${fetchResponce.status}: ${fetchResponce.statusText}`);
    return await fetchResponce.json();
  };
  hideAll = () => {
    this.setState(cur => ({ contentHide: !cur.contentHide }));
  };
  updateChanges = (active = "", search = "", hash = "") => {
    this.setState({ active, search, hash });
    active === "films"
      ? this.setState(cur => {
          return { objOfContentList: cur.films };
        })
      : this.getFields("objOfContentList", `${this.state.appUrl + active}/${search}`);
    this.updateHashChanges(hash);
  };
  getNumber = (hash = 0) => {
    return +hash.slice(1) - 10 * (this.state.search ? this.state.search.split("=")[1] - 1 : 0);
  };
  updateHashChanges = (hash = "") => {
    this.setState({ hash: hash });
    hash ? this.setState({ objOfContentField: this.state.objOfContentList.results[this.getNumber(hash)] }) : this.setState({ objOfContentField: {} });
  };
  changeActive = active => {
    this.setState({ active });
  };
  render() {
    return (
      <Router>
        <Header objOfHeaderField={this.state.objOfHeaderField} active={this.state.active} changeActive={this.changeActive} />
        <ContentDiv>
          <Route
            exact
            path="/:id"
            render={({ match, ...rest }) => {
              if ((match && match.params.id !== this.state.active) || (rest && rest.location.search !== this.state.search)) {
                this.updateChanges(match && match.params.id, rest && rest.location.search, rest && rest.location.hash);
              } else if (
                rest &&
                (rest.location.hash !== this.state.hash ||
                  (rest.location.hash &&
                    this.state.objOfContentList.results[this.getNumber(rest.location.hash)] &&
                    (!this.state.objOfContentField ||
                      this.state.objOfContentList.results[this.getNumber(rest.location.hash)].url !== this.state.objOfContentField.url)))
              ) {
                this.updateHashChanges(rest.location.hash);
              }
              return (
                <Content
                  search={this.state.search}
                  objOfContentList={this.state.objOfContentList}
                  contentHide={this.state.contentHide}
                  objOfContentField={this.state.objOfContentField}
                />
              );
            }}
          />
        </ContentDiv>
        <Footer hideAll={this.hideAll} contentHide={this.state.contentHide} />
      </Router>
    );
  }
}

export default App;
