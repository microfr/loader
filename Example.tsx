import React from "react";
import ReactDOM, { render } from "react-dom";
import Loader from "./src";
import * as fromApollo from "apollo-boost";
import * as fromHooks from '@apollo/react-hooks'
import PropTypes from 'prop-types'

window['React'] = React
window['ReactDOM'] = ReactDOM
window['ApolloBoost'] = fromApollo
window['@apollo/react-hooks'] = fromHooks

const NODE = document.querySelector("#app");

render(
    <Loader uri="http://localhost:8081" namespace="CreditScore" renderWhileLoading={() => "yo yo mang"}/>,
  NODE
);
