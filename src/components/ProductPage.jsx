import React from "react";
import { string, shape } from "prop-types";
import { productSection, btns } from "./productPage.module.scss";
import { Link } from "react-router-dom";

const ProductPage = ({ location: { name, price, type } }) => {
	return (
		<section className={productSection}>
			<ul>
				<li>
					<h2>Name:</h2>
					<p> {name}</p>
				</li>
				<li>
					<h2>Type:</h2>
					<p> {type}</p>
				</li>
				<li>
					<h2>Price:</h2>
					<p> {price}</p>
				</li>
			</ul>
			<div className={btns}>
				<Link to="/">Go Back</Link>
			</div>
		</section>
	);
};

ProductPage.propTypes = {
	location: shape({
		name: string.isRequired,
		type: string.isRequired,
		price: string.isRequired,
	}),
};

export default ProductPage;
