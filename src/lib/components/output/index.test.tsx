import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Output from "./index";

describe("<Output />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Output>Test</Output>);
    expect(container).toBeInTheDocument();
  });
});
