import React from "react";
// import { Link } from "react-router-dom";
// import WarehouseDetailsItem from "../WarehouseItem/WarehouseItem";
import WarehouseDetailsItem from "../WarehouseDetailsItem/WarehouseDetailsItem";
import axios from "axios";
import api from "../../utils/api";
import Spinner from "../Spinner/Spinner";
import "./warehouseDetails.scss";
import editIcon from "../../assets/icons/edit-24px-white.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import arrowIcon from "../../assets/icons/arrow_back-24px.svg";

class WarehouseDetails extends React.Component {
    // state to store current list of items
    state = {
        warehouse: {},
        inventories: [],
    };


    // component did update
    // axios inside to get inventories
    // set it to state

    componentDidMount = () => {
        // Change axios call here to get specific warehouse

        // axios call to get list of warehouses from api
        console.log('component mounted');
        axios
            .get(api.apiUrl + api.warehouseEndpoint + '/' + this.props.match.params.id)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    warehouse: response.data,
                });
            })
            .catch((error) =>
                console.error(
                    `Error on axios GET to ${
                        api.apiUrl + api.warehouseEndpoint
                    }`,
                    error
                )
            );
    };

    

    componentDidUpdate (){
        if (this.state.inventories < 1){
        axios
            .get(api.apiUrl + api.inventoryEndpoint + '/warehouse/' + this.state.warehouse.id)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    inventories: response.data,
                });
            })
            .catch((error) =>
                console.error(
                    `Error on axios GET to ${
                        api.apiUrl + api.inventoryEndpoint
                    }`,
                    error
                )
            );
    };
}
         
        

    render() {
        // Spinner component to display in case
        // axios call takes long
        let inventories = <Spinner />;

        if (this.state.inventories) {
            inventories = this.state.inventories.map((item) => {
                return (
                    <WarehouseDetailsItem key={item.id} {...item} itemType="Inventory Item" />
                );
            });
        }
        let warehouseInfo = <Spinner/>;
        console.log(this.state.warehouse);
        if (this.state.warehouse.contact) {
            warehouseInfo = (<div className="warehouse-details__item-details-container">
            <div className="warehouse-details__address-wrap">
            <h3 className="warehouse-details__item-warehouse-address-title">WAREHOUSE ADDRESS:</h3>
            <address className="warehouse-details__warehouse-address-info">{`${this.state.warehouse.address}, ${this.state.warehouse.city}, ${this.state.warehouse.country}`}</address>
            </div>
            <div className="warehouse-details__name-info-container">
            <div className="warehouse-details__name-wrap">
            <h3 className="warehouse-details__warehouse-contact-name-title">CONTACT NAME:</h3>

            <p className="warehouse-details__contact-name">{this.state.warehouse.contact.name}</p>
            <p className="warehouse-details__contact-name">{this.state.warehouse.contact.position}</p>
            </div>
            <div className="warehouse-details__info-wrap">
            <h3 className="warehouse-details__warehouse-contact-info-title">CONTACT INFORMATION:</h3>
            <p className="warehouse-details__contact-info">{this.state.warehouse.contact.phone}</p>
            <p className="warehouse-details__contact-info">{this.state.warehouse.contact.email}</p>
            </div>
            </div>
        </div>)
        }

        return (
            <div className="warehouse-details">
                <div className="warehouse-details__top">
                <img
                                src={arrowIcon}
                                alt="Back Arrow Icon"
                                className="warehouse-details__arrow-icon"
                            />
                    <h1 className="warehouse-details__title">{this.state.warehouse.name}</h1>
                    <button className="warehouse-details__edit-icon-button" type="button" name="edit-button" value=""><img
                                src={editIcon}
                                alt="Edit Icon"
                                className="warehouse-details__edit-icon"
                            /></button>
                </div>
                {/* Show warehouse details here */}
                {/* ie. address, contact name, contact information */}
                {warehouseInfo}
                <div className="warehouse-details__content">
                    <div className="warehouse-details__label">
                        <div className="warehouse-details__column-heading warehouse-details__column-heading--main">
                            <p className="warehouse-details__item-item-name warehouse-details__item">
                                INVENTORY ITEM
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-details__sort-icon"
                            />
                        </div>
                        <div className="warehouse-details__column-heading warehouse-details__column-heading--category">
                            <p className="warehouse-details__item-address warehouse-details__item">
                                CATEGORY
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-details__sort-icon"
                            />
                        </div>
                        <div className="warehouse-details__column-heading">
                            <p className="warehouse-details__item-contact-name warehouse-details__item">
                                STATUS
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-details__sort-icon"
                            />
                        </div>
                        <div className="warehouse-details__column-heading warehouse-details__column-heading--quantity ">
                            <p className="warehouse-details__item-contact-info warehouse-details__item">
                                QUANTITY
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-details__sort-icon"
                            />
                        </div>
                        <p className="warehouse-details__column-heading warehouse-details__column-heading--action warehouse-details__item">
                            ACTIONS
                        </p>
                    </div>
                    <ul className="warehouse-details__list">{inventories}</ul>
                </div>
            </div>
        );
    }
}

export default WarehouseDetails;
