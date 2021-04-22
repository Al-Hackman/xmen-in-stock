import React from "react";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./EditWarehouse.scss";
import axios from "axios";
import api from "../../utils/api";
import PageTitle from "../PageTitle/PageTitle";

class EditWarehouse extends React.Component {
    state = {
        warehouseId: "",
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
            errors: {
                warehouseInputError: warehouseError,
                addressInputError: addressError,
                cityInputError: cityError,
                countryInputError: countryError,
                nameInputError: nameError,
                positionInputError: positionError,
                phoneInputError: phoneError,
                emailInputError: emailError,
            },
        });

        if (
            !Object.values(this.state.inputs).includes("") &&
            isValidEmail &&
            isValidPhone
        ) {
            let newDetails = {
                name: this.state.inputs.warehouseInput,
                address: this.state.inputs.addressInput,
                city: this.state.inputs.cityInput,
                country: this.state.inputs.countryInput,
                contactName: this.state.inputs.nameInput,
                position: this.state.inputs.positionInput,
                phone: this.state.inputs.phoneInput,
                email: this.state.inputs.emailInput,
            };
            if (this.props.isNew) {
                axios
                    .post(api.apiUrl + api.warehouseEndpoint, newDetails)
                    .then(() => {
                        this.props.history.push("/");
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                event.target.reset();
            } else {
                axios
                    .put(
                        `${api.apiUrl}${api.warehouseEndpoint}/${this.state.warehouseId}`,
                        newDetails
                    )
                    .then(() => {
                        this.props.history.push("/");
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                event.target.reset();
            }
        }
    };

    handleOnCancel = (event) => {
        event.preventDefault();

        this.props.history.goBack();
    };

    componentDidMount = () => {
        if (!this.props.isNew) {
            axios
                .get(
                    `${api.apiUrl}${api.warehouseEndpoint}/${this.props.match.params.id}`
                )
                .then((response) => {
                    this.setState({
                        warehouseId: response.data.id,
                        inputs: {
                            warehouseInput: response.data.name,
                            addressInput: response.data.address,
                            cityInput: response.data.city,
                            countryInput: response.data.country,
                            nameInput: response.data.contact.name,
                            positionInput: response.data.contact.position,
                            phoneInput: response.data.contact.phone,
                            emailInput: response.data.contact.email,
                        },
                    });
                })
                .catch((err) => {
                    console.error(
                        "Error on GET method during ComponentDidMount",
                        err
                    );
                });
        }
    };

    render() {
        let errorMessage = <p>This field is required</p>;

        let buttonText = this.props.isNew ? "+ Add Warehouse" : "Save";
        let titleText = this.props.isNew
            ? "Add New Warehouse"
            : "Edit Warehouse";
        return (
            <section className="warehouse-form">
                <PageTitle title={titleText} {...this.props} />
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
                                    defaultValue={
                                        this.state.inputs.warehouseInput
                                    }
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
                                    defaultValue={
                                        this.state.inputs.addressInput
                                    }
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
                                    defaultValue={this.state.inputs.cityInput}
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
                                    defaultValue={
                                        this.state.inputs.countryInput
                                    }
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
                                    defaultValue={this.state.inputs.nameInput}
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
                                    defaultValue={
                                        this.state.inputs.positionInput
                                    }
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
                                    defaultValue={this.state.inputs.phoneInput}
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
                                    defaultValue={this.state.inputs.emailInput}
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
                                onClick={(event) => this.handleOnCancel(event)}
                            >
                                Cancel
                            </button>
                            <button
                                className="button warehouse-form__button"
                                type="submit"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default EditWarehouse;
