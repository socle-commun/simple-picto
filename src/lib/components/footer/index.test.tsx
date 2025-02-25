import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./index";

describe("<Footer />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Footer>Test</Footer>);
    expect(container).toBeInTheDocument();
  });
});
