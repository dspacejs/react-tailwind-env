import {
  ApolloProvider as BaseApolloProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

import { Props } from "./types";

const ApolloProvider = ({ children, uri }: Props): React.ReactElement => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    (async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : "";
      setBearerToken(token);
    })();
  }, [getAccessTokenSilently, isAuthenticated]);

  const apolloClient = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    headers: !bearerToken
      ? { authorization: `Bearer ${bearerToken}` }
      : undefined,
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  return (
    <BaseApolloProvider client={apolloClient}>{children}</BaseApolloProvider>
  );
};

export default ApolloProvider;
