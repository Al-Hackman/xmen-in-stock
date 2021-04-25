import React from "react";
import WarehouseDetailsItem from "../WarehouseDetailsItem/WarehouseDetailsItem";
import axios from "axios";
import api from "../../utils/api";
import Spinner from "../Spinner/Spinner";
import "./warehouseDetails.scss";
import PageTitle from '../PageTitle/PageTitle';
import sortIcon from "../../assets/icons/sort-24px.svg";
import Modal from '../Modal/Modal';
import DeleteItem from '../DeleteItem/DeleteItem';


class WarehouseDetails extends React.Component {
    // state to store current list of items
    state = {
        warehouse: {},
        inventories: [],
        showModal: false,
        currentItem: {},
    };

    handleToggleModal = (event, item) => {
        event.preventDefault();

        this.setState({
            showModal: !this.state.showModal,
            currentItem: item,
        });
    };

    handleOnDelete = (event) => {
        event.preventDefault();

        axios
            .delete(
                `${api.apiUrl}${api.inventoryEndpoint}/${this.state.currentItem.id}`
            )
            .then(() => {
                this.loadItems();
            })
            .catch((error) =>
                console.error("Error occured when trying to delete", error)
            );
    };

    loadItems = () => {
        // axios call to get list of inventories from api
        axios
        .get(
            api.apiUrl +
                api.warehouseEndpoint +
                "/" +
                this.props.match.params.id
        )
        .then((response) => {
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

    componentDidMount = () => {
        this.loadItems();
    };

    componentDidUpdate() {
        if (this.state.inventories < 1) {
            axios
                .get(
                    api.apiUrl +
                        api.inventoryEndpoint +
                        "/warehouse/" +
                        this.state.warehouse.id
                )
                .then((response) => {
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
        }
    }

    render() {
        // Spinner component to display in case
        // axios call takes long
        let inventories = <Spinner />;

        if (this.state.inventories) {
            inventories = this.state.inventories.map((item) => {
                return (
                    <WarehouseDetailsItem
                        key={item.id}
                        {...item}
                        itemType="Inventory Item"
                        handleToggleModal={this.handleToggleModal}
                    />
                );
            });
        }

        let warehouseInfo = <Spinner />;

        if (this.state.warehouse.contact) {
            warehouseInfo = (
                <div className="warehouse-details__info-container divider--top">
                    <div className="warehouse-details__address-wrap">
                        <h3 className="warehouse-details__warehouse-title">
                            WAREHOUSE ADDRESS:
                        </h3>
                        <address className="warehouse-details__warehouse-address-info">{`${this.state.warehouse.address}, ${this.state.warehouse.city}, ${this.state.warehouse.country}`}</address>
                    </div>
                    <div className="warehouse-details__name-info-container">
                        <div className="warehouse-details__name-wrap">
                            <h3 className="warehouse-details__warehouse-contact-name-title">
                                CONTACT NAME:
                            </h3>

                            <p className="warehouse-details__contact-name">
                                {this.state.warehouse.contact.name}
                            </p>
                            <p className="warehouse-details__contact-name">
                                {this.state.warehouse.contact.position}
                            </p>
                        </div>
                        <div className="warehouse-details__info-wrap">
                            <h3 className="warehouse-details__warehouse-contact-info-title">
                                CONTACT INFORMATION:
                            </h3>
                            <p className="warehouse-details__contact-info">
                                {this.state.warehouse.contact.phone}
                            </p>
                            <p className="warehouse-details__contact-info">
                                {this.state.warehouse.contact.email}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        let modal = this.state.showModal ? (
            <Modal handleOnClick={this.handleToggleModal}>
                <DeleteItem
                    itemType="inventory"
                    item={this.state.currentItem}
                    handleOnCancel={this.handleToggleModal}
                    handleOnDelete={this.handleOnDelete}
                />
            </Modal>
        ) : (
            <></>
        );

        return (
            <div className="warehouse-details">
                <PageTitle
                    title={this.state.warehouse.name}
                    {...this.props}
                    editBtn
                    itemType="warehouse"
                    itemId={this.state.warehouse.id}
                />
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
                            <p className="warehouse-details__item-category warehouse-details__item">
                                CATEGORY
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-details__sort-icon"
                            />
                        </div>
                        <div className="warehouse-details__column-heading warehouse-details__column-heading--status">
                            <p className="warehouse-details__item-status warehouse-details__item">
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
                                QTY
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
                {modal}
            </div>
        );
    }
}

export default WarehouseDetails;
