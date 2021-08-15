import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import ProductPage from "../ProductPage";

test("Should match Snapshot", () => {
	const product = {
		location: { name: "Mouse 1", price: "112.00$", type: "Mouse" },
	};
	render(
		<Router>
			<ProductPage {...product} />
		</Router>
	);
	const tree = renderer
		.create(
			<Router>
				<ProductPage {...product} />
			</Router>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
