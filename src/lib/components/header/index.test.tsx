import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./index";

describe("<Header />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Header>Test</Header>);
    expect(container).toBeInTheDocument();
  });
});
