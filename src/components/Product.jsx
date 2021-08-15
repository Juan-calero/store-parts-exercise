import React from "react";
import { string } from "prop-types";
import { Link } from "react-router-dom";
import { item } from "./product.module.scss";

const Product = ({ name, type, price }) => {
	return (
		<li>
			<Link
				to={{
					pathname: `/product/${name}`,
					name: name,
					type: type,
					price: price,
				}}
				className={item}
			>
				<p>{name}</p>
				<p>{type}</p>
				<p>{price}</p>
			</Link>
		</li>
	);
};

Product.propTypes = {
	name: string.isRequired,
	type: string.isRequired,
	price: string.isRequired,
};

export default Product;
