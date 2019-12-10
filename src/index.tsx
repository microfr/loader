import React, { useState, useEffect } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ErrorBoundary from "@microfr/error-boundary";
import Loader from "./Loader";
import { ErrorResponse } from "apollo-link-error";
import * as fromTypes from './types'
import PropTypes from 'prop-types';

const _LoaderWrapper: React.FunctionComponent<fromTypes.Props> = ({ uri, ...props }) => {
  /*
    Sets apollo client instance.
  */
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);

  /*
    Instantiate apollo client instance on load. Connects to BFF.
  */
  useEffect(() => {
    const newClient = new ApolloClient({
      uri,
      headers: {
        ...props.headers,
        authorization: localStorage.getItem("token")
      },
      onError: err => setError(err)
    });
    setClient(newClient);
  }, []);

  return (
    <ErrorBoundary>
      {error && <div>Could not connect to server.</div>}
      {client && !error && (
        <ApolloProvider client={client}>
          <Loader {...props} />
        </ApolloProvider>
      )}
    </ErrorBoundary>
  );
};

_LoaderWrapper.displayName = "LoaderWrapper";

_LoaderWrapper.propTypes = {
  uri: PropTypes.string.isRequired,
  headers: PropTypes.object,
}

export default React.memo(_LoaderWrapper);
