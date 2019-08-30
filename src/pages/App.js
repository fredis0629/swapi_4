import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import Swapi from "./swapi/index.js";
import NoMatch from "../components/index404.js";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={["/:id", "/"]}
            render={({ match, location }) => {
              return <Swapi match={match} params={match.params} location={location} />;
            }}
          />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
