import React from "react";
import Aux from "../../../../hoc/Auxiliary";
import Button from "../../../UI/Button/Button";

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
		<li key={igKey}>
			<span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
			{props.ingredients[igKey]}
		</li>
	));

	return (
		<Aux>
			<h3>Your order</h3>
			<p>A delicious burger with...</p>
			<ul>{ingredientSummary}</ul>
			<p>
				<strong>Total price: {props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCanceled}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>
				CONTINUE
			</Button>
		</Aux>
	);
};

export default orderSummary;
