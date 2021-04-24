import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import "./EditInventory.scss";
import api from "../../utils/api";
import axios from "axios";
import EditAction from "../EditAction/EditAction";

class EditInventory extends React.Component {
    state = {
        warehouseList: [],
        categoryList: [],
        itemId: "",
        inputs: {
            itemName: "",
            warehouseId: "",
            description: "",
            category: "",
            inStock: "Out of Stock",
            warehouse: "",
            quantity: 0,
        },
        errors: {
            itemNameError: "",
            descriptionError: "",
            categoryError: "",
            warehouseError: "",
        }

    };

    handleOnChange = (event) => {
        this.setState({
            inputs: {
                ...this.state.inputs,
                [event.target.name]: event.target.value,
            },
        });
    };

    componentDidUpdate = () => {
        console.log(this.state);

        if (this.state.warehouseList.length < 1) {
            axios
                .get(`${api.apiUrl}${api.warehouseEndpoint}`)
                .then((response) => {
                    let warehouses = [];
                    response.data.forEach((warehouse) => {
                        if (!warehouses.includes(warehouse.name)) {
                            warehouses.push(warehouse.name);
                        }
                    });
                    this.setState({
                        warehouseList: warehouses,
                    });
                })
                .catch((error) =>
                    console.error(
                        "Error with GET warehouse request in ComonentDidMount in Edit Invetory",
                        error
                    )
                );
        }
    };

    componentDidMount = () => {
        axios
            .get(`${api.apiUrl}${api.inventoryEndpoint}`)
            .then((response) => {
                let categories = [];
                response.data.forEach((item) => {
                    if (!categories.includes(item.category)) {
                        categories.push(item.category);
                    }
                });
                this.setState({
                    categoryList: categories,
                });
            })
            .catch((error) =>
                console.error(
                    "Error with GET inventory request in ComonentDidMount in Edit Invetory",
                    error
                )
            );

        if (!this.props.isNew) {
            axios
                .get(
                    `${api.apiUrl}${api.inventoryEndpoint}/${this.props.match.params.id}`
                )
                .then((response) => {
                    this.setState({
                        itemId: response.data.id,
                        inputs: {
                            warehouseId: response.data.warehouseID,
                            itemName: response.data.itemName,
                            description: response.data.description,
                            category: response.data.category,
                            inStock: response.data.status,
                            warehouse: response.data.warehouseName,
                            quantity: 0,
                        },
                    });
                })
                .catch((error) =>
                    console.error(
                        "Error with GET inventory request in ComponentDidMount in Edit Inventory",
                        error
                    )
                );
        }
    };

    handleOnCancel = (event) => {
        event.preventDefault();

        this.props.history.goBack();
    };

    handleOnSubmit = (event) => {
        event.preventDefault();

        let warehouseNameError = this.state.inputs.warehouse ? "inventory-form__error" : "";
        let descriptionError = this.state.inputs.description ? "inventory-form__error" : "";
        let itemNameError = this.state.inputs.itemName ? "inventory-form__error" : "";
        let categoryError = this.state.inputs.category ? "inventory-form__error" : "";

        if (this.state.inputs.warehouse || this.state.inputs.description || this.state.inputs.itemName || this.state.inputs.category) {
            this.setState({
                errors: {
                    itemNameError: itemNameError,
                    descriptionError: descriptionError,
                    categoryError: categoryError,
                    warehouseError: warehouseNameError,
                }
            })
        } else {
            let newDetails = {
                id: this.state.inputs.itemId,
                warehouseID: this.state.inputs.warehouseId,
                warehouseName: this.state.inputs.warehouse,
                itemName: this.state.inputs.itemName,
                description: this.state.inputs.description,
                category: this.state.inputs.category,
                status: this.state.inputs.inStock,
                quantity: this.state.inputs.quantity,
            };

            if (this.props.isNew) {
                axios
                    .post(api.apiUrl + api.inventoryEndpoint, newDetails)
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

    render = () => {
        let categoryOptions =
            this.state.categoryList.length > 0 ? (
                this.state.categoryList.map((category, index) => (
                    <option key={category + index} value={category}>
                        {category}
                    </option>
                ))
            ) : (
                <></>
            );
        let warehouseOptions =
            this.state.categoryList.length > 0 ? (
                this.state.warehouseList.map((warehouse, index) => (
                    <option key={warehouse + index} value={warehouse}>
                        {warehouse}
                    </option>
                ))
            ) : (
                <></>
            );

        let titleText = this.props.isNew
            ? "Add New Inventory Item"
            : "Edit Inventory Item";

        let buttonText = this.props.isNew ? "+ Add Item" : "Save";

        let quantityInput = <></>;

        if (this.state.inputs.inStock.toLowerCase() === "in stock") {
            quantityInput = (
                <>
                    <label
                        className="inventory-form__label"
                        htmlFor="description"
                    >
                        Quantity
                    </label>
                    <input
                        defaultValue={0}
                        className={
                            "inventory-form__input inventory-form__desciption"
                        }
                        name="description"
                        type="number"
                    />
                </>
            );
        }
        let errorMessage = <p className="validation-error">This field is required</p>;
        return (
            <div className="inventory-form">
                <PageTitle {...this.props} title={titleText} />
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
                            htmlFor="itemName"
                        >
                            Item Name
                        </label>
                        <input
                            defaultValue={this.state.inputs.itemName}
                            className={`inventory-form__input ${this.state.errors.itemNameError}`}
                            name="itemName"
                            placeholder="Item Name"
                            type="text"
                        />
                        {this.state.errors.itemNameError ? (
                            errorMessage
                        ) : (
                            <></>
                        )}
                        <label
                            className="inventory-form__label"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            defaultValue={this.state.inputs.description}
                            className={
                                `inventory-form__input inventory-form__description ${this.state.errors.descriptionError}`
                            }
                            name="description"
                            placeholder="Please enter a brief item description"
                            type="text"
                        >
                        </textarea>
                        {this.state.errors.descriptionError ? (
                            errorMessage
                        ) : (
                            <></>
                        )}
                        <label
                            className="inventory-form__label"
                            htmlFor="itemName"
                        >
                            Category
                        </label>
                        <select
                            defaultValue={this.state.inputs.category}
                            name="category"
                            className={`inventory-form__input inventory-form__select ${this.state.errors.descriptionError}`}
                        >
                            <option className="option" value="" disabled hidden>
                                Please select
                            </option>
                            {categoryOptions}
                        </select>
                        {this.state.errors.categoryError ? (
                            errorMessage
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="inventory-form__wrap">
                        <h2 className="inventory-form__heading">
                            Item Availability
                        </h2>
                        <label className="inventory-form__label">Status</label>
                        <div className="inventory-form__status">
                            <input
                                value="In Stock"
                                className={"inventory-form__radio"}
                                name="inStock"
                                id="InStock"
                                type="radio"
                            />
                            <label className="inventory-form__radio-label" htmlFor="InStock">In stock</label>
                            <input
                                value="Out of Stock"
                                className={"inventory-form__radio"}
                                name="inStock"
                                id="OutOfStock"
                                type="radio"
                            />
                            <label className="inventory-form__radio-label" htmlFor="OutOfStock">Out of stock</label>
                        </div>
                        {quantityInput}
                        <label
                            className="inventory-form__label"
                            htmlFor="category"
                        >
                            Warehouse
                        </label>
                        <select
                            defaultValue={this.state.inputs.warehouse}
                            name="warehouse"
                            className={`inventory-form__input inventory-form__select ${this.state.errors.descriptionError}`}
                        >
                            <option disabled hidden value="">
                                Please select
                            </option>
                            {warehouseOptions}
                        </select>
                        {this.state.errors.warehouseNameError ? (
                            errorMessage
                        ) : (
                            <></>
                        )}
                    </div>
                    <EditAction {...this.props} buttonText={buttonText} />
                </form>
            </div>
        );
    };
}

export default EditInventory;
