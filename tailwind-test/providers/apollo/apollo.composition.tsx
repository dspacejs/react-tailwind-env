import React from "react";

import ApolloProvider from "./apollo";

export const BasicApolloProvider = (): React.ReactElement => (
  <ApolloProvider uri="http://localhost:4000" children="test" />
);
