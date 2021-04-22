import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import "./EditInventory.scss";
import api from "../../utils/api";
import axios from "axios";
import EditAction from "../EditAction/EditAction";

class EditInventory extends React.Component {
    state = {
        itemId: "",
        itemName: "",
        description: "",
        category: "",
        inStock: false,
        warehouse: "",
        warehouseList: [],
        categoryList: [],
    };

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
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
                return categories;
                this.setState({
                    categoryList: categories,
                });
            })
            .then((categories) => {
                axios
                    .get(`${api.apiUrl}${api.inventoryEndpoint}`)
                    .then((response) => {
                        let warehouses = [];
                        response.data.forEach((warehouse) => {
                            if (!warehouses.includes(warehouse.warehouseName)) {
                                warehouses.push(warehouse.warehouseName);
                            }
                        });

                        this.setState({
                            categoryList: categories,
                            warehouseList: warehouses,
                        });
                    })
                    .catch((error) =>
                        console.error(
                            "Error with GET warehouse request in ComonentDidMount in Edit Invetory",
                            error
                        )
                    );
            })
            .catch((error) =>
                console.error(
                    "Error with GET inventory request in ComonentDidMount in Edit Invetory",
                    error
                )
            );

        if (!this.props.isNew) {
            console.log("need to load existing item details");
        }
    };

    handleOnCancel = (event) => {
        event.preventDefault();

        this.props.history.goBack();
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
                            defaultValue={this.state.itemName}
                            className={"inventory-form__input"}
                            name="itemName"
                            placeholder="Item Name"
                            type="text"
                        />
                        <label
                            className="inventory-form__label"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <input
                            defaultValue={this.state.itemName}
                            className={
                                "inventory-form__input inventory-form__desciption"
                            }
                            name="description"
                            placeholder="Please enter a brief item description"
                            type="text"
                        />
                        <label
                            className="inventory-form__label"
                            htmlFor="itemName"
                        >
                            Category
                        </label>
                        <select
                            defaultValue=""
                            name="category"
                            className="inventory-form__input inventory-form__select"
                        >
                            <option value="" disabled hidden>
                                Please select
                            </option>
                            {categoryOptions}
                        </select>
                    </div>
                    <div className="inventory-form__wrap">
                        <h2 className="inventory-form__heading">
                            Item Availability
                        </h2>
                        <label className="inventory-form__label">Status</label>
                        <div className="inventory-for__status">
                            <input
                                value={true}
                                className={"inventory-form__radio"}
                                name="instock"
                                id="InStock"
                                type="radio"
                            />
                            <label htmlFor="InStock">In stock</label>
                            <input
                                value={false}
                                className={"inventory-form__radio"}
                                name="instock"
                                id="OutOfStock"
                                type="radio"
                            />
                            <label htmlFor="OutOfStock">Out of stock</label>
                        </div>
                        <label
                            className="inventory-form__label"
                            htmlFor="category"
                        >
                            Warehouse
                        </label>
                        <select
                            defaultValue=""
                            name="warehouse"
                            className="inventory-form__input inventory-form__select"
                        >
                            <option disabled hidden value="">
                                Please select
                            </option>
                            {warehouseOptions}
                        </select>
                    </div>
                    <EditAction {...this.props} buttonText={buttonText} />
                </form>
            </div>
        );
    };
}

export default EditInventory;
