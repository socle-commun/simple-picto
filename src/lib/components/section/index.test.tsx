import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Section from "./index";

describe("<Section />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Section>Test</Section>);
    expect(container).toBeInTheDocument();
  });
});
