import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Fieldset from "./index";

describe("<Fieldset />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Fieldset>Test</Fieldset>);
    expect(container).toBeInTheDocument();
  });
});
