import React, { useState, useEffect } from "react";
import Product from "./Product";
import {
	mainSection,
	mainForm,
	productSection,
	priceOrder,
} from "./mainpage.module.scss";

const MainPage = () => {
	const [productsData, setProductsData] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [types, setTypes] = useState([]);
	const [typeValue, setTypeValue] = useState("Type");
	const [isAscendingPrice, setIsAscendingPrice] = useState(true);

	useEffect(() => {
		const callAPI = async () => {
			const resp = await fetch("http://localhost:8081/store/parts");
			if (resp.status >= 400) {
				throw new Error("Oh uh, something went wrong");
			}
			const body = await resp.json();
			body.sort((a, b) =>
				+a.price.slice(0, -1) > +b.price.slice(0, -1) ? 1 : -1
			);
			setProductsData(body);
		};
		callAPI();
	}, []);

	useEffect(() => {
		const callAPI = async () => {
			const resp = await fetch("http://localhost:8081/store/part-types");
			if (resp.status >= 400) {
				throw new Error("Oh uh, something went wrong");
			}
			const body = await resp.json();
			setTypes(body);
		};
		callAPI();
	}, []);

	const handlePriceOrder = (e) => {
		e.preventDefault();
		setProductsData(productsData.reverse());
		setIsAscendingPrice(!isAscendingPrice);
	};

	const filter = (product) => {
		const checkType = typeValue === "Type" || product.type === typeValue;
		const checkSearch =
			!searchValue || product.name.toLowerCase().includes(searchValue);
		return checkSearch && checkType && product;
	};

	const mapProducts = productsData.filter(filter).map((product) => {
		return <Product key={product.name} {...product} />;
	});
	const mapTypes = types.map((type, index) => {
		return (
			<option key={index} value={type}>
				{type}
			</option>
		);
	});

	return (
		<main className={mainSection}>
			<form className={mainForm}>
				<input
					aria-label="Search"
					type="search"
					placeholder="Search..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<select
					aria-label="Type"
					onChange={(e) => setTypeValue(e.target.value)}
				>
					<option value="Type">Type</option>
					{mapTypes}
				</select>
				<input
					aria-label="Price Order"
					className={priceOrder}
					type="button"
					value={`${isAscendingPrice ? "Ascending" : "Descending"} Price`}
					onClick={(e) => handlePriceOrder(e)}
				/>
			</form>
			<section className={productSection}>
				<ul>{mapProducts}</ul>
			</section>
		</main>
	);
};

export default MainPage;
