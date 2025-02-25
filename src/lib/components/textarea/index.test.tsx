import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Textarea from "./index";

describe("<Textarea />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Textarea>Test</Textarea>);
    expect(container).toBeInTheDocument();
  });
});
