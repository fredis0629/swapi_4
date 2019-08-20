import React from "react";
import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";

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
  }
  state = {
    appUrl: "https://swapi.co/api/",
    objOfHeaderField: {},
    objOfContentList: {
      results: []
    },
    additionalInformation: {},
    objOfContentField: [],
    contentHide: true,
    active: "",
    search: ""
  };
  getFields = (stateField, url) => {
    this.getFetch(url).then(val => this.setState(() => ({ [stateField]: val })));
  };
  getFetch = async (url = this.state.appUrl) => {
    const fetchResponce = await fetch(url);
    if (!fetchResponce.ok) throw Error(`Fetch request error ${fetchResponce.status}: ${fetchResponce.statusText}`);
    return await fetchResponce.json();
  };
  fillContentField = obj => {
    let result = [];
    for (const key in obj) {
      if (arrOffieldNotForDisplay.indexOf(key) === -1)
        result.push(
          <tr key={key}>
            <th style={{ "max-width": "200px" }}>{key.replace(/_/gi, " ").toUpperCase()}</th>
            <th>{obj[key]}</th>
          </tr>
        );
    }
    this.setState({ objOfContentField: result });
  };
  hideAll = () => {
    this.setState(cur => ({ objOfContentField: [], contentHide: !cur.contentHide }));
  };
  getUpdate = async () => await this.getFields("objOfContentList", this.state.objOfHeaderField[this.state.active]);
  changeActive = val => {
    this.setState({ active: val });
    this.getFields("objOfContentList", `${this.state.appUrl + this.state.active}/${val}`);
  };
  changeSearch = val => {
    this.setState({ search: val });
    this.getFields("objOfContentList", `${this.state.appUrl + this.state.active}/${val}`);
  };
  changeUpdading = (active = "", search = "") => {
    this.setState({ active: active, search: search });
    this.getFields("objOfContentList", `${this.state.appUrl + active}/${search}`);
  };
  render() {
    return (
      <Router>
        <Header objOfHeaderField={this.state.objOfHeaderField} getFields={this.getFields} active={this.state.active} changeActive={this.changeActive} />
        <ContentDiv>
          <Route
            exact
            path="/:id"
            render={({ match, ...rest }) => {
              if ((match && match.params.id !== this.state.active) || (rest && rest.location.search !== this.state.search)) {
                this.changeUpdading(match && match.params.id, rest && rest.location.search);
              } else if ((match === null && this.state.active !== "") || (rest && rest.location.search !== this.state.search)) {
                this.changeUpdading();
              }
              return (
                <Content
                  match={match}
                  rest={rest}
                  appUrl={this.state.appUrl}
                  objOfHeaderField={this.state.objOfHeaderField}
                  objOfContentList={this.state.objOfContentList}
                  getFields={this.getFields}
                  contentHide={this.state.contentHide}
                  objOfContentField={this.state.objOfContentField}
                  fillContentField={this.fillContentField}
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
