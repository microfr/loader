import React, { useState } from "react";
import PropTypes from "prop-types";
import ScriptInjector from "./ScriptInjector";
import { DocumentNode } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import ErrorBoundary from "@microfr/error-boundary";

interface Props {
  token?: string;
  query: DocumentNode;
  namespace: string;
}

const _Loader: React.FunctionComponent<Props> = ({ query, namespace }) => {
  const [src, setSrc] = useState<string>("");
  const { loading } = useQuery(query, {
    onCompleted: ({ asset }) => {
      if (asset) {
        setSrc(asset.src);
      }
    }
  });
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<div>loading component</div>}>
        {!loading && src && <ScriptInjector src={src} namespace={namespace} />}
      </React.Suspense>
    </ErrorBoundary>
  );
};
_Loader.displayName = "Loader";

_Loader.propTypes = {
  token: PropTypes.string
};

export default React.memo(_Loader);
