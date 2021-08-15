import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import MainPage from "../MainPage";

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
	cleanup();
});

//SNAPSHOT
test("should match snapshot", () => {
	render(<MainPage />);
	const tree = renderer.create(<MainPage />).toJSON();
	expect(tree).toMatchSnapshot();
});

//INPUT FIELDS
test("Search field is empty on render", () => {
	const { getByLabelText } = render(<MainPage />);
	expect(getByLabelText(/Search/).textContent).toBe("");
});

test("button should render in Ascending Price", () => {
	const wrapper = shallow(<MainPage />);
	const text = wrapper.find(".priceOrder");
	expect(text.get(0).props.value).toContain("Ascending");
});

test("button should become Descending Price after click", () => {
	const wrapper = shallow(<MainPage />);
	const button = wrapper.find(".priceOrder");
	button.simulate("click", {
		preventDefault: () => {},
	});
	const text = wrapper.find(".priceOrder");
	expect(text.get(0).props.value).toContain("Descending");
});

test("Select field should start with TYPE option", () => {
	const { getByText } = render(<MainPage />);
	expect(getByText(/Type/).textContent).toBe("Type");
});

//FILTERING PROCESS
describe("Filtering Should work", () => {
	const filter = (product, typeValue, searchValue) => {
		const checkType = typeValue === "Type" || product.type === typeValue;
		const checkSearch =
			!searchValue || product.name.toLowerCase().includes(searchValue);
		return checkSearch && checkType && product;
	};
	test("Filter Mouse with type:Type and search:mou. Should be Truthy.", () => {
		const product = {
			name: "Mouse 2",
			price: "35.99$",
			type: "Mouse",
		};
		expect(filter(product, "Type", "mou")).toBeTruthy();
	});
	test("Filter Keyboard with type:Type and search:mou. Should be Falsy.", () => {
		const product = {
			name: "Keyboard 3",
			price: "83.00$",
			type: "Keyboard",
		};
		expect(filter(product, "Type", "mou")).toBeFalsy();
	});
	test("Filter Monitor with type:Monitor and search:itor. Should be Truthy", () => {
		const product = {
			name: "Monitor 1",
			price: "531.00$",
			type: "Monitor",
		};
		expect(filter(product, "Monitor", "itor")).toBeTruthy();
	});
});
