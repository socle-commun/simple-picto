import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Select from "./index";

describe("<Select />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Select>Test</Select>);
    expect(container).toBeInTheDocument();
  });
});
