import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Span from "./index";

describe("<Span />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Span>Test</Span>);
    expect(container).toBeInTheDocument();
  });
});
