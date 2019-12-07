import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useScript } from "@microfr/use-script";

interface Props {
  namespace: string;
  src: string;
}

const _ScriptInjector: React.FunctionComponent<Props> = ({ src, namespace }) => {
  const [Component, setComponent] = useState<React.FunctionComponent | null>(
    null
  );
  const { component, error } = useScript(src, namespace);

  if (error)
    throw new Error(`Unable to register component during script injection.`);

  useEffect(() => {
    if (component) {
      setComponent(component);
    }
  }, [component]);
  // @ts-ignore
  return Component ? <Component /> : <div>Loading</div>;
};
_ScriptInjector.displayName = "ScriptInjector";

_ScriptInjector.propTypes = {
  src: PropTypes.string.isRequired
};

export default React.memo(_ScriptInjector);
