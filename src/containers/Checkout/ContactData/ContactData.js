import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import classes from "./ContactData.module.css";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elType: "input",
				elConfig: {
					type: "text",
					placeholder: "Your name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elType: "input",
				elConfig: {
					type: "text",
					placeholder: "Your street"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elType: "input",
				elConfig: {
					type: "text",
					placeholder: "Your zip code"
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elType: "input",
				elConfig: {
					type: "text",
					placeholder: "Your country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elType: "input",
				elConfig: {
					type: "email",
					placeholder: "Your e-mail"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elType: "select",
				elConfig: {
					options: [
						{
							value: "fastest",
							displayValue: "Fastest"
						},
						{
							value: "cheapest",
							displayValue: "Cheapest"
						}
					]
				},
				value: "fastest",
				validation: {},
				valid: true
			}
		},
		formIsValid: false,
		loading: false
	};

	orderHandler = e => {
		e.preventDefault();

		this.setState({ loading: true });

		const formData = {};

		for (let formElId in this.state.orderForm) {
			formData[formElId] = this.state.orderForm[formElId].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};

		fetch("http://localhost:3001/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8"
			},
			body: JSON.stringify(order)
		})
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push("/");
				console.log(response);
			})
			.catch(err => {
				this.setState({ loading: false });
				console.log(err);
			});
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (e, inputId) => {
		const updatedOrderForm = { ...this.state.orderForm };

		const updatedFormEl = { ...updatedOrderForm[inputId] };

		updatedFormEl.value = e.target.value;

		updatedFormEl.valid = this.checkValidity(
			updatedFormEl.value,
			updatedFormEl.validation
		);

		updatedFormEl.touched = true;

		updatedOrderForm[inputId] = updatedFormEl;

		let formIsValid = true;

		for (let inputId in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputId].valid && formIsValid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElementsArr = [];

		for (let key in this.state.orderForm) {
			formElementsArr.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArr.map(formEl => (
					<Input
						key={formEl.id}
						elType={formEl.config.elType}
						elConfig={formEl.config.elConfig}
						value={formEl.config.value}
						shouldValidate={formEl.config.validation}
						touched={formEl.config.touched}
						invalid={!formEl.config.valid}
						changed={e => this.inputChangedHandler(e, formEl.id)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data.</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	ings: state.ingredients,
	price: state.totalPrice
});

export default connect(mapStateToProps)(ContactData);
