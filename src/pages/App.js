import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import Swapi from "./swapi/index.js";
import NoMatch from "../components/index404.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact sensitive path="/" render={() => <Link to={"/swapi"}>Swapi</Link>} />
          <Route
            path="/swapi"
            render={({ location }) => {
              return <Swapi location={location} />;
            }}
          />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
