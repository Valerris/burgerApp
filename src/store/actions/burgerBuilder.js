import * as actionTypes from "./actionTypes";

export const addIngredient = payload => {
	return { type: actionTypes.ADD_INGREDIENT, ingredientName: payload };
};

export const removeIngredient = payload => {
	return { type: actionTypes.REMOVE_INGREDIENT, ingredientName: payload };
};

export const fetchIngredientsFailed = () => ({
	type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const setIngredients = payload => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: payload
	};
};

export const initIngredients = () => {
	return dispatch => {
		fetch("http://localhost:3001/ingredients")
			.then(response => response.json())
			.then(json => dispatch(setIngredients(json)))
			.catch(err => dispatch(fetchIngredientsFailed()));
	};
};
