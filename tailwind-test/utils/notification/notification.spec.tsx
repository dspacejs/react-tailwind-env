import { render } from "@testing-library/react";
import React from "react";

import { NotificationProvider, useNotificationQueue } from "./utils";

describe("<NotificationProvider>", () => {
  interface Props {
    children: React.ReactNode;
  }

  let props: Props;
  const getComponent = () => render(<NotificationProvider {...props} />);

  beforeEach(() => {
    props = {
      children: "children",
    };
  });

  it("renders `props.children`", () => {
    getComponent().getByText(props.children as string);
  });
});

describe("`useNotificationQueue`", () => {
  it("renders without errors", () => {
    const Component = (): React.ReactElement => {
      useNotificationQueue();

      return <div>content</div>;
    };

    render(
      <NotificationProvider children={<Component />} />
    );
  });
});
