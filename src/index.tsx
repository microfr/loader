import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ScriptInjector from "./ScriptInjector";
import ApolloClient, { DocumentNode } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import ErrorBoundary from "@microfr/error-boundary";

interface Props {
  token?: string;
  query: DocumentNode;
  namespace: string;
  /*
  URI of GraphQL server to be passed into apollo client.
  */
  uri: string
}

const _Loader: React.FunctionComponent<Props> = ({ query, namespace, uri }) => {
  const [src, setSrc] = useState<string>("");
  const [client, setClient] = useState<ApolloClient<any> | null>(null);

  const { loading } = useQuery(query, {
    onCompleted: ({ asset }) => {
      if (asset) {
        setSrc(asset.src);
      }
    }
  });

  useEffect(() => {
    setClient(
      new ApolloClient({
        uri,
      })
    );
  });
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<div>loading component</div>}>
        {client && (
          <ApolloProvider client={client}>
            {!loading && src && (
              <ScriptInjector src={src} namespace={namespace} />
            )}
          </ApolloProvider>
        )}
      </React.Suspense>
    </ErrorBoundary>
  );
};
_Loader.displayName = "Loader";

_Loader.propTypes = {
  token: PropTypes.string
};

export default React.memo(_Loader);
