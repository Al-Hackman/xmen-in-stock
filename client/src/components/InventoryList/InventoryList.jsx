import React from "react";
import { Link } from "react-router-dom";
import InventoryDetails from "../InventoryDetails/InventoryDetails";
import axios from "axios";
import api from "../../utils/api";
import Spinner from "../Spinner/Spinner";
import "./inventoryList.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import DeleteItem from "../DeleteItem/DeleteItem";
import Modal from "../Modal/Modal";

class InventoryList extends React.Component {
    // state to store current list of items
    state = {
        items: [],
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
        // axios call to get list of warehouses from api
        axios
            .get(api.apiUrl + api.inventoryEndpoint)

            .then((response) => {
                this.setState({
                    items: response.data,
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

    componentDidMount = () => {
        this.loadItems();
    };

    render() {
        // Spinner component to display in case
        // axios call takes long
        let items = <Spinner />;

        if (this.state.items) {
            items = this.state.items.map((item) => {
                return (
                    <InventoryDetails
                        key={item.id}
                        {...item}
                        handleToggleModal={this.handleToggleModal}
                    />
                );
            });
        }

        let modal = this.state.showModal ? (
            <Modal handleOnClick={this.handleToggleModal}>
                <DeleteItem
                    itemType="warehouse"
                    item={this.state.currentItem}
                    handleOnCancel={this.handleToggleModal}
                    handleOnDelete={this.handleOnDelete}
                />
            </Modal>
        ) : (
            <></>
        );

        return (
            <div className="inventory-list">
                <div className="inventory-list__top">
                    <h1 className="inventory-list__title">Inventory</h1>
                    <form className="inventory-list__search">
                        <input
                            className="inventory-list__input button"
                            name="search"
                            type="text"
                            placeholder="Search..."
                        />
                        <button className="inventory-list__search-button">
                            <img src={searchIcon} alt="search" />
                        </button>
                    </form>
                    <Link to="/add-inventory" className="inventory-list__add">
                        <button className="button inventory-list__add-button">
                            + Add new Item
                        </button>
                    </Link>
                </div>
                <div className="inventory-list__content">
                    <div className="inventory-list__label">
                        <div className="inventory-list__column-heading inventory-list__column-heading--main">
                            <p className="inventory-list__item-item-name inventory-list__item">
                                Inventory Item
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="inventory-list__sort-icon"
                            />
                        </div>
                        <div className="inventory-list__column-heading inventory-list__column-heading--category">
                            <p className="inventory-list__item-address inventory-list__item">
                                Category
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="inventory-list__sort-icon"
                            />
                        </div>
                        <div className="inventory-list__column-heading inventory-list__column-heading--status">
                            <p className="inventory-list__item-contact-name inventory-list__item">
                                Status
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="inventory-list__sort-icon"
                            />
                        </div>
                        <div className="inventory-list__column-heading inventory-list__column-heading--quantity ">
                            <p className="inventory-list__item-contact-info inventory-list__item">
                                QTY
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="inventory-list__sort-icon"
                            />
                        </div>
                        <div className="inventory-list__column-heading inventory-list__column-heading--warehouse ">
                            <p className="inventory-list__item-contact-info inventory-list__item">
                                Warehouse
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="inventory-list__sort-icon"
                            />
                        </div>
                        <p className="inventory-list__column-heading inventory-list__column-heading--action inventory-list__item">
                            Actions
                        </p>
                    </div>
                    <ul className="inventory-list__list">{items}</ul>
                </div>

                {modal}
            </div>
        );
    }
}

export default InventoryList;
