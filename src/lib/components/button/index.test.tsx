import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./index";

describe("<Button />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Button>Test</Button>);
    expect(container).toBeInTheDocument();
  });
});
