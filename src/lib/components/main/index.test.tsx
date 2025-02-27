import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Main from "./index";

describe("<Main />", () => {
	it("renders without crashing", () => {
		const { container } = render(<Main>Test</Main>);
		expect(container).toBeInTheDocument();
	});
});
