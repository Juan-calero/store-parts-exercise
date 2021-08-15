import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

test("Should match snapshot", () => {
	render(<App />);
	const tree = renderer.create(<App />).toJSON();
	expect(tree).toMatchSnapshot();
});

test("H1 is displaying correctly", () => {
	const wrapper = shallow(<App />);
	const text = wrapper.find("h1.title");
	expect(text.text()).toBe("Juan Calero Store Parts");
});
