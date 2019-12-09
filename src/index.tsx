import React, { useState, useEffect } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ErrorBoundary from "@microfr/error-boundary";
import Loader from "./Loader";
import { ErrorResponse } from "apollo-link-error";

interface Props {
  token?: string;
  namespace: string;
  /*
  URI of GraphQL server to be passed into apollo client.
  */
  uri: string;
}

const _LoaderWrapper: React.FunctionComponent<Props> = ({ uri, ...props }) => {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null)

  /*
    Instantiate apollo client instance. Conects to BFF.
  */
  useEffect(() => {
    const newClient = new ApolloClient({
      uri,
      headers: {
        authorization: localStorage.getItem('token')
      },
      onError: (err) => setError(err)
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

export default React.memo(_LoaderWrapper);
