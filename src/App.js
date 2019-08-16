import React from "react";
import Header from "./header.js";
import Content from "./content.js";
import Footer from "./footer.js";

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
    contentHide: true
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

  render() {
    return (
      <>
        <Header objOfHeaderField={this.state.objOfHeaderField} getFields={this.getFields} />
        <Content
          objOfContentList={this.state.objOfContentList}
          additionalInformation={this.state.additionalInformation}
          getFields={this.getFields}
          contentHide={this.state.contentHide}
          objOfContentField={this.state.objOfContentField}
          fillContentField={this.fillContentField}
        />
        <Footer hideAll={this.hideAll} contentHide={this.state.contentHide} />
      </>
    );
  }
}

export default App;
