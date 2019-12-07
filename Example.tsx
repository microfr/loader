import React from "react";
import ReactDOM, { render } from "react-dom";
import Loader from "./src";
import ApolloClient, {gql} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

window['React'] = React
window['ReactDOM'] = ReactDOM

const NODE = document.querySelector("#app");

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const ASSET_QUERY = gql`
  query {
    asset {
      src
    }
  }
`;


render(
  <ApolloProvider client={client}>
    <Loader query={ASSET_QUERY} namespace="CreditScore"/>
  </ApolloProvider>,
  NODE
);
