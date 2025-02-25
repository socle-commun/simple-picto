import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Nav from "./index";

describe("<Nav />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Nav>Test</Nav>);
    expect(container).toBeInTheDocument();
  });
});
