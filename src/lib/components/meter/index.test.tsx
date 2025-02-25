import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Meter from "./index";

describe("<Meter />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Meter>Test</Meter>);
    expect(container).toBeInTheDocument();
  });
});
