import React, { useState } from "react";
import PropTypes from "prop-types";
import ScriptInjector from "./ScriptInjector";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

interface Props {
  token?: string;
  namespace: string;
}

const ASSET_QUERY = gql`
  query($namespace: String!) {
    asset(namespace: $namespace) {
      src
    }
  }
`;

const _Loader: React.FunctionComponent<Props> = ({ namespace, ...props }) => {
  const [src, setSrc] = useState<string>("");

  const { loading } = useQuery(ASSET_QUERY, {
    variables: {
      namespace
    },
    onCompleted: ({ asset }) => {
      if (asset) {
        setSrc(asset.src);
      }
    }
  });

  return (
    <React.Suspense fallback={<div>loading component</div>}>
      {!loading && src && <ScriptInjector src={src} namespace={namespace} {...props}/>}
    </React.Suspense>
  );
};
_Loader.displayName = "Loader";

_Loader.propTypes = {
  token: PropTypes.string
};

export default React.memo(_Loader);
