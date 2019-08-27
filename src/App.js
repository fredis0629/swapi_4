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
  componentDidMount() {
    this.getFields("objOfHeaderField");
    this.getFields("films", "https://swapi.co/api/films/");
  }
  state = {
    appUrl: "https://swapi.co/api/",
    objOfHeaderField: {},
    contentHide: true,
    films: {}
  };
  getFields = (stateField, url = this.state.appUrl) => {
    this.getFetch(url).then(val => this.setState(() => ({ [stateField]: val })));
  };
  getFetch = async (url = this.state.appUrl) => {
    const fetchResponce = await fetch(url);
    if (!fetchResponce.ok) throw Error(`Fetch request error ${fetchResponce.status}: ${fetchResponce.statusText}, ${fetchResponce.url}`);
    return await fetchResponce.json();
  };
  hideAll = () => {
    this.setState(cur => ({ contentHide: !cur.contentHide }));
  };
  render() {
    return (
      <Router>
        <Route
          path="/:id"
          children={({ match }) => {
            return <Header objOfHeaderField={this.state.objOfHeaderField} active={match ? match.params.id : ""} />;
          }}
        />
        <ContentDiv>
          <Route
            exact
            path="/:id"
            children={({ match, ...rest }) => {
              return <Content films={this.state.films.results} appUrl={this.state.appUrl} contentHide={this.state.contentHide} match={match} rest={rest} />;
            }}
          />
        </ContentDiv>
        <Footer hideAll={this.hideAll} contentHide={this.state.contentHide} />
      </Router>
    );
  }
}

export default App;
