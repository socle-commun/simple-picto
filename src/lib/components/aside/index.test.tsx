import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Aside from "./index";

describe("<Aside />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Aside>Test</Aside>);
    expect(container).toBeInTheDocument();
  });
});
