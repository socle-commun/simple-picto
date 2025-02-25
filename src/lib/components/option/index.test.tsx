import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Option from "./index";

describe("<Option />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Option>Test</Option>);
    expect(container).toBeInTheDocument();
  });
});
