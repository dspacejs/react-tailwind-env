import { render } from "@testing-library/react";
import React from "react";

import ApolloProvider from "./apollo";
import { Props } from "./types";

describe("<ApolloProvider>", () => {
  let props: Props;
  const getComponent = () => render(<ApolloProvider {...props} />);

  beforeEach(() => {
    props = {
      children: "children",
      uri: "http://localhost:4000",
    };
  });

  it("renders `props.children`", () => {
    getComponent().getByText(props.children as string);
  });
});
