import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import { bg, title } from "./app.module.scss";
import "./reset.scss";
import ProductPage from "./components/ProductPage";

function App() {
	return (
		<div className={bg}>
			<header>
				<h1 className={title}>Juan Calero Store Parts</h1>
			</header>
			<Router>
				<Route exact path="/">
					<MainPage />
				</Route>
				<Route path="/product/:productName" component={ProductPage} />
			</Router>
		</div>
	);
}

export default App;
