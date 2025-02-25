import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Progress from "./index";

describe("<Progress />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Progress>Test</Progress>);
    expect(container).toBeInTheDocument();
  });
});
