import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Product from "../Product";

test("Should match snapshot", () => {
	const product = { name: "Mouse 1", price: "112.00$", type: "Mouse" };
	render(
		<Router>
			<Product {...product} />
		</Router>
	);
	const tree = renderer
		.create(
			<Router>
				<Product {...product} />
			</Router>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
