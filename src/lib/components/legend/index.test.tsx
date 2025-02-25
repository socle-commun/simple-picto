import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Legend from "./index";

describe("<Legend />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Legend>Test</Legend>);
    expect(container).toBeInTheDocument();
  });
});
