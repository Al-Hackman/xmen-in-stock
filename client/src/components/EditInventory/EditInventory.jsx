import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import "./EditInventory.scss";

class EditInventory extends React.Component {
    state = {
        inputs: {
            itemNameInput: "",
            descriptionInput: "",
            categoryInput: "",
            statusInput: "",
            warehouseInput: "",
        },
        errors: {
            itemNameInputError: "",
            descriptionInput: "",
            categoryInputError: "",
            statusInputError: "",
            warehouseInputError: "",
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
            let itemNameInputError = "";
            if (this.state.inputs.itemNameInput === "") {
                itemNameInputError = "inventory-form__error";
            }
            let descriptionError = "";
            if (this.state.inputs.descriptionInput === "") {
                descriptionError = "inventory-form__error";
            }
            let categoryError = "";
            if (this.state.inputs.categoryInput === "") {
                categoryError = "inventory-form__error";
            }
            let statusError = "";
            if (this.state.inputs.statusInput === "") {
                statusError = "inventory-form__error";
            }
            let warehouseError = "";
            if (this.state.inputs.warehouseInput === "") {
                warehouseError = "inventory-form__error";
            }
            
            this.setState({
                errors:{
                    itemNameInputError: itemNameInputError,
                    descriptionInputError: descriptionError,
                    categoryInputError: categoryError,
                    statusInputError: statusError,
                    warehouseInputError: warehouseError,
                    }
            });

        if (!Object.values(this.state.inputs).includes("")) {
            // replace the alert and run the axios here
            axios
            .post(api.apiUrl + api.inventoryEndpoint, {
                itemName: this.state.inputs.itemNameInput, 
                description: this.state.inputs.descriptionInput, 
                category: this.state.inputs.categoryInput, 
                status: this.state.inputs.statusInput, 
                warehouse: this.state.inputs.warehouseInput, 
            })
            .then(()=> {this.props.history.push("/")}) 
            .catch(err=>{
                console.error(err);
              }) 
              event.target.reset()
        }
    };

    render() {
        let errorMessage = <p>This field is required</p>;

        return (
            <section className="inventory-form">
                <header className="inventory-form__header">
                    <Link to="/" className="inventory-list__icon-link">  
                        <img
                            className="inventory-form__icon"
                            src={backArrowIcon}
                            alt="back arrow icon"
                        />
                    </Link>
                    <h1 className="inventory-form__title">Edit Inventory Item</h1>
                </header>
                <div className="inventory-form__container">
                    <form
                        className="inventory-form__form"
                        onSubmit={(event) => {
                            this.handleOnSubmit(event);
                        }}
                        onChange={(event) => {
                            this.handleOnChange(event);
                        }}
                    >
                        <div className="inventory-form__wrap">
                            <h2 className="inventory-form__heading">
                                Item Details
                            </h2>
                            <label
                                className="inventory-form__label"
                                htmlFor="itemNameInput"
                            >
                                Item Name
                                <input
                                    className={`inventory-form__input ${this.state.errors.itemNameInputError}`}
                                    id="itemNameInput"
                                    name="itemNameInput"
                                    placeholder="Item Name"
                                    type="text"
                                />
                                {this.state.errors.itemNameInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="inventory-form__label"
                                htmlFor="descriptionInput"
                            >
                                Description
                                <textarea
                                    className={`inventory-form__textarea ${this.state.errors.descriptionInputError}`}
                                    id="descriptionInput"
                                    name="descriptionInput"
                                    placeholder="Please enter a brief description..."
                                    type="text">
                                </textarea>
                                {this.state.errors.descriptionInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="inventory-form__label"
                                htmlFor="cityInput"
                            >
                                Category
                                <select
                                    className={`inventory-form__select ${this.state.errors.categoryInputError}`}
                                    id="cityInput"
                                    name="cityInput"
                                    placeholder="Please select"
                                    type="text">
                                        <option value="item">{this.props.item}</option>
                                </select>
                                {this.state.errors.categoryInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            
                        </div>
                        <div className="inventory-form__wrap">
                            <h2 className="inventory-form__heading">
                                Item Availability
                            </h2>
                            <label
                                className="inventory-form__label"
                                htmlFor="statusInput"
                            >
                                Status
                                <span class="inventory-form__radio">
                                <input
                                    className={`inventory-form__radio-input ${this.state.errors.inInputError}`}
                                    id="inInput"
                                    name="inInput"
                                    type="radio"
                                />
                                <span class="inventory-form__radio-control"></span>
                                </span>
                                <span class="inventory-form__radio-label">In stock</span>
                                <span class="inventory-form__radio">
                                <input
                                    className={`inventory-form__radio-input ${this.state.errors.outInputError}`}
                                    id="outInput"
                                    name="outInput"
                                    type="radio"
                                />
                                <span class="inventory-form__radio-control"></span>
                                </span>
                                <span class="inventory-form__radio-label">Out of stock</span>
                                {this.state.errors.statusInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                            <label
                                className="inventory-form__label"
                                htmlFor="cityInput"
                            >
                                Warehouse
                                <select
                                    className={`inventory-form__select ${this.state.errors.warehouseInputError}`}
                                    id="warehouseInput"
                                    name="warehouseInput"
                                    placeholder="Please select"
                                    type="text">
                                        <option value="item">{this.props.warehouse}</option>
                                </select>
                                {this.state.errors.warehouseInputError ? (
                                    errorMessage
                                ) : (
                                    <></>
                                )}
                            </label>
                        </div>
                        <div className="inventory-form__button-wrap">
                            <button
                                className="button inventory-form__button-cancel"
                                onClick={() => this.handleOnCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="button inventory-form__button"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default EditInventory;
