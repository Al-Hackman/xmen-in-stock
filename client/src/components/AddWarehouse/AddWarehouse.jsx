import React from "react";
// import axios from 'axios';
// import api from "../../utils/api";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./AddWarehouse.scss";

class AddWarehouse extends React.Component {
    state = {
        inputs: {
            warehouseInput: "",
            addressInput: "",
            cityInput: "",
            countryInput: "",
            nameInput: "",
            positionInput: "",
            phoneInput: "",
            emailInput: "",
        },
        errors: {
            warehouseInputError: "",
            addressInputError: "",
            cityInputError: "",
            countryInputError: "",
            nameInputError: "",
            positionInputError: "",
            phoneInputError: "",
            emailInputError: "",
        },
    };

    handleOnChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
            inputs: {
                ...this.state.inputs,
                [event.target.name]: event.target.value, 
            },
        });
    };

    handleOnSubmit = (event) => {
        event.preventDefault();
        let warehouseError = "";
        if (this.state.inputs.warehouseInput === "") {
            warehouseError = "warehouse-form__error";
        }
        let addressError = "";
        if (this.state.inputs.addressInput === "") {
            addressError = "warehouse-form__error";
        }
        let cityError = "";
        if (this.state.inputs.cityInput === "") {
            cityError = "warehouse-form__error";
        }
        let countryError = "";
        if (this.state.inputs.countryInput === "") {
            countryError = "warehouse-form__error";
        }
        let nameError = "";
        if (this.state.inputs.nameInput === "") {
            nameError = "warehouse-form__error";
        }
        let positionError = "";
        if (this.state.inputs.positionInput === "") {
            positionError = "warehouse-form__error";
        }
        let phoneError = "";
        const phoneRegex = /^\+?(\d{1,2})?\s?\-?\.?\(?\d{3}[\-\)\.\s]?\s?\d{3}[\-\.\s]?\d{4}$/im;
        let isValidPhone = phoneRegex.test(this.state.inputs.phoneInput); //this will return a true/false value
        console.log("phoneValid", isValidPhone)
        console.log("phoneInput", this.state)

        if (this.state.inputs.phoneInput === "") {
            phoneError = "warehouse-form__error";
        }
        
        let emailError = "";
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValidEmail = emailRegex.test(this.state.inputs.emailInput);
        if (this.state.inputs.emailInput === "") {
            emailError = "warehouse-form__error";
        }

        this.setState({
            errors:{
                warehouseInputError: warehouseError,
                addressInputError: addressError,
                cityInputError: cityError,
                countryInputError: countryError,
                nameInputError: nameError,
                positionInputError: positionError,
                phoneInputError: phoneError,
                emailInputError: emailError,
                }
        });

        if (!Object.values(this.state.inputs).includes("") && isValidEmail && isValidPhone) {
            // replace the alert and run the axios here
            alert("Posted!");
        }
    };

    render() {
        let errorMessage = <p>This field is required</p>;

        return (
            <section className="warehouse-form">
                <header className="warehouse-form__header">
                    <img
                        className="warehouse-form__icon"
                        src={backArrowIcon}
                        alt="back arrow icon"
                    />
                    <h1 className="warehouse-form__title">Add New Warehouse</h1>
                </header>
                <div className="warehouse-form__container">
                    <form
                        className="warehouse-form__form"
                        onSubmit={(event) => {
                            this.handleOnSubmit(event);
                        }}
                        onChange={(event) => {
                            this.handleOnChange(event);
                        }}
                    >
                        <div className="warehouse-form__wrap">
                            <h2 className="warehouse-form__heading">
                                Warehouse Details
                            </h2>
                            <label
                                className="warehouse-form__label"
                                htmlFor="warehouseInput"
                            >
                                Warehouse Name
                                <input
                                    className={`warehouse-form__input ${this.state.errors.warehouseInputError}`}
                                    id="warehouseInput"
                                    name="warehouseInput"
                                    placeholder="Warehouse Name"
                                    type="text"
                                />
                                {this.state.errors.warehouseInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="addressInput"
                            >
                                Street Address
                                <input
                                    className={`warehouse-form__input ${this.state.errors.addressInputError}`}
                                    id="addressInput"
                                    name="addressInput"
                                    placeholder="Street Address"
                                    type="text"
                                />
                                {this.state.errors.addressInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="cityInput"
                            >
                                City
                                <input
                                    className={`warehouse-form__input ${this.state.errors.cityInputError}`}
                                    id="cityInput"
                                    name="cityInput"
                                    placeholder="City"
                                    type="text"
                                />
                                {this.state.errors.cityInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="countryInput"
                            >
                                Country
                                <input
                                    className={`warehouse-form__input ${this.state.errors.countryInputError}`}
                                    id="countryInput"
                                    name="countryInput"
                                    placeholder="Country"
                                    type="text"
                                />
                                {this.state.errors.countryInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                        </div>
                        <div className="warehouse-form__wrap">
                            <h2 className="warehouse-form__heading">
                                Contact Details
                            </h2>
                            <label
                                className="warehouse-form__label"
                                htmlFor="nameInput"
                            >
                                Contact Name
                                <input
                                    className={`warehouse-form__input ${this.state.errors.nameInputError}`}
                                    id="nameInput"
                                    name="nameInput"
                                    placeholder="Contact Name"
                                    type="text"
                                />
                                {this.state.errors.nameInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="positionInput"
                            >
                                Position
                                <input
                                    className={`warehouse-form__input ${this.state.errors.positionInputError}`}
                                    id="positionInput"
                                    name="positionInput"
                                    placeholder="Position"
                                    type="text"
                                />
                                {this.state.errors.positionInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="phoneInput"
                            >
                                Phone Number
                                <input
                                    className={`warehouse-form__input ${this.state.errors.phoneInputError}`}
                                    id="phoneInput"
                                    name="phoneInput"
                                    placeholder="Phone Number"
                                />
                                {this.state.errors.phoneInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="emailInput"
                            >
                                Email
                                <input
                                    className={`warehouse-form__input ${this.state.errors.emailInputError}`}
                                    id="emailInput"
                                    name="emailInput"
                                    placeholder="Email"
                                />
                                {this.state.errors.addressInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                        </div>
                        <div className="warehouse-form__button-wrap">
                            <button
                                className="button warehouse-form__button-cancel"
                                onClick={() => this.handleOnCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="button warehouse-form__button"
                                type="submit"
                            >
                                + Add Warehouse
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default AddWarehouse;
