import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Article from "./index";

describe("<Article />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Article>Test</Article>);
    expect(container).toBeInTheDocument();
  });
});
