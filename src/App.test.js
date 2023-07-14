import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Products heading", () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/Products/i);
  expect(headingElement).toBeInTheDocument();
});
