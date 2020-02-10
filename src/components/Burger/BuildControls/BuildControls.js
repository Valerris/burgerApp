import React from "react";
import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
	{ label: "Salad", type: "salad" },
	{ label: "Bacon", type: "bacon" },
	{ label: "Cheese", type: "cheese" },
	{ label: "Meat", type: "meat" }
];

const buildControls = props => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			<div>
				{controls.map(ctrl => (
					<BuildControl
						key={ctrl.label}
						label={ctrl.label}
						added={() => {
							props.ingredientAdded(ctrl.type);
						}}
						removed={() => {
							props.ingredientRemoved(ctrl.type);
						}}
						disabled={props.disabled[ctrl.type]}
					/>
				))}
			</div>
			<button
				className={classes.OrderButton}
				onClick={props.ordered}
				disabled={!props.purchasable}
			>
				{props.isAuth ? "ORDER NOW" : "SIGN-UP TO ORDER"}
			</button>
		</div>
	);
};

export default buildControls;
