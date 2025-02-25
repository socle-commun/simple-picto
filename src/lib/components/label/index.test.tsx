import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Label from "./index";

describe("<Label />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Label>Test</Label>);
    expect(container).toBeInTheDocument();
  });
});
