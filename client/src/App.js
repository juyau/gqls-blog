import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Menubar from "./components/Menubar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const client = new ApolloClient({
  uri: "https://gqls-blog.herokuapp.com/"
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Container>
          <Menubar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
