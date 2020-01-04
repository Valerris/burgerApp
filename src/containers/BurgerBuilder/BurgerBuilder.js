import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSumary";

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	};

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => ingredients[igKey])
			.reduce((prev, curr) => prev + curr, 0);

		this.setState({ purchasable: sum > 0 });
	};

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;

		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updatedCount;

		const priceAddition = INGREDIENT_PRICES[type];

		const oldPrice = this.state.totalPrice;

		const newPrice = oldPrice + priceAddition;

		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;

		const updatedCount = oldCount - 1;

		const updatedIngredients = { ...this.state.ingredients };

		updatedIngredients[type] = updatedCount;

		const priceDeduction = INGREDIENT_PRICES[type];

		const oldPrice = this.state.totalPrice;

		const newPrice = oldPrice - priceDeduction;

		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		alert("You continue!");
	};

	render() {
		const disableInfo = { ...this.state.ingredients };

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					<OrderSummary
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disableInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;
