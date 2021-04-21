import React from "react";
// import axios from 'axios';
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./WarehouseForm.scss";

class WarehouseForm extends React.Component {
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
        this.setState({
            inputs: {
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

        this.setState({
            errors:{
                warehouseInputError: warehouseError,
            }
        });

        if (!Object.values(this.state.inputs).includes("")) {
            // replace the alert and run the axios here
            alert("Posted!");
        }
    };

    render() {
        let errorMessage = <p>This is the error message</p>;

        return (
            <section className="warehouse-form">
                <header className="warehouse-form__header">
                    <img
                        className="warehouse-form__icon"
                        src={backArrowIcon}
                        alt="back arrow icon"
                    />
                    <h1 className="warehouse-form__title">{this.title}</h1>
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
                                    required=""
                                />
                                {/* Display error message if there's error in input */}
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
                                    className="warehouse-form__input"
                                    id="addressInput"
                                    name="addressInput"
                                    placeholder="Street Address"
                                    type="text"
                                    required=""
                                />
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="cityInput"
                            >
                                City
                                <input
                                    className="warehouse-form__input"
                                    id="cityInput"
                                    name="cityInput"
                                    placeholder="City"
                                    type="text"
                                    required=""
                                />
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="countryInput"
                            >
                                Country
                                <input
                                    className="warehouse-form__input"
                                    id="countryInput"
                                    name="countryInput"
                                    placeholder="Country"
                                    type="text"
                                    required=""
                                />
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
                                    className="warehouse-form__input"
                                    id="nameInput"
                                    name="nameInput"
                                    placeholder="Contact Name"
                                    type="text"
                                    required=""
                                />
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="positionInput"
                            >
                                Position
                                <input
                                    className="warehouse-form__input"
                                    id="positionInput"
                                    name="positionInput"
                                    placeholder="Position"
                                    type="text"
                                    required=""
                                />
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="phoneInput"
                            >
                                Phone Number
                                <input
                                    className="warehouse-form__input"
                                    id="phoneInput"
                                    name="phoneInput"
                                    placeholder="Phone Number"
                                    type="tel"
                                    pattern="[0-9]{10}"
                                    required=""
                                />
                            </label>
                            <label
                                className="warehouse-form__label"
                                htmlFor="emailInput"
                            >
                                Email
                                <input
                                    className="warehouse-form__input"
                                    id="emailInput"
                                    name="emailInput"
                                    placeholder="Email"
                                    type="email"
                                    required=""
                                />
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
                                {this.action}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default WarehouseForm;
