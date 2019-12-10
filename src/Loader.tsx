import React, { useState } from "react";
import PropTypes from "prop-types";
import ScriptInjector from "./ScriptInjector";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import * as fromTypes from './types'

const ASSET_QUERY = gql`
  query($namespace: String!) {
    asset(namespace: $namespace) {
      src
    }
  }
`;

const _Loader: React.FunctionComponent<Omit<fromTypes.Props, 'uri'>> = ({
  namespace,
  renderWhileLoading,
  ...props
}) => {
  const [src, setSrc] = useState<string>("");

  const { loading } = useQuery(ASSET_QUERY, {
    variables: {
      namespace
    },
    onCompleted: ({ asset }) => {
      if (asset) {
        setSrc(asset.src);
      }
    },
    onError: err => {
      throw err;
    }
  });

  /*
    Handle what to render while script is being laoded.
  */
  const whileLoading =
    typeof renderWhileLoading === "function" ? (
      renderWhileLoading()
    ) : (
      <div>Loading Component</div>
    );

  return (
    <React.Suspense fallback={() => whileLoading()}>
      {!loading && src && (
        <ScriptInjector src={src} namespace={namespace} {...props} />
      )}
    </React.Suspense>
  );
};

_Loader.displayName = "Loader";

export default React.memo(_Loader);
