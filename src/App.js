import React from "react";
import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";

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
    objOfContentField: {
      results: []
    }
  };
  getFields = (stateField, url) => {
    this.getFetch(url).then(val => this.setState(() => ({ [stateField]: val })));
  };
  getFetch = async (url = this.state.appUrl) => {
    const fetchResponce = await fetch(url);
    if (!fetchResponce.ok) throw Error(`Fetch request error ${fetchResponce.status}: ${fetchResponce.statusText}`);
    return await fetchResponce.json();
  };
  render() {
    return (
      <>
        <Header objOfHeaderField={this.state.objOfHeaderField} getFields={this.getFields} />
        <Content objOfContentList={this.state.objOfContentList} objOfContentField={this.state.objOfContentField} getFields={this.getFields} />
        <Footer />
      </>
    );
  }
}

export default App;
