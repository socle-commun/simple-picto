import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Div from "./index";

describe("<Div />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Div>Test</Div>);
    expect(container).toBeInTheDocument();
  });
});
