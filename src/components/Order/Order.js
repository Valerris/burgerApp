import React from "react";

import classes from "./Order.module.css";

const order = props => {
	const ingredients = [];

	for (let igName in props.ingredients) {
		ingredients.push({ name: igName, amount: props.ingredients[igName] });
	}

	const ingredientsOutput = ingredients.map(ig => {
		return (
			<span
				key={ig.name}
				style={{
					textTransform: "capitalize",
					display: "block",
					width: "max-content",
					margin: "0.125rem",
					padding: "0.25rem",
					border: "1px solid #ddd",
					borderRadius: "0.25rem"
				}}
			>
				{ig.name}({ig.amount})
			</span>
		);
	});

	return (
		<div className={classes.Order}>
			<p>
				<b>Ingredients:</b>
			</p>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap"
				}}
			>
				{ingredientsOutput}
			</div>

			<p>
				Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
