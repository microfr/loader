type Index = {
  [key: string]: any;
};

export interface Props {
  token?: string;
  namespace: string;
  /*
    URI of GraphQL server to be passed into apollo client.
    */
  uri: string;
  /*
      Headers to pass into each request. 'authorization' is there by default.
    */
  headers?: Index;
  /*
      A value/component (etc) to render while asset is loading.
    */
  renderWhileLoading?(): any;
}
