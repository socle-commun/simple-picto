import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Input from "./index";

describe("<Input />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Input>Test</Input>);
    expect(container).toBeInTheDocument();
  });
});
