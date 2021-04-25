import React from "react";
import { Link } from "react-router-dom";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import axios from "axios";
import api from "../../utils/api";
import Spinner from "../Spinner/Spinner";
import "./WarehouseList.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import Modal from "../Modal/Modal";
import DeleteItem from "../DeleteItem/DeleteItem";

class WarehouseList extends React.Component {
    // state to store current list of items
    state = {
        items: [],
        itemsToShow: [],
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
                `${api.apiUrl}${api.warehouseEndpoint}/${this.state.currentItem.id}`
            )
            .then(() => {
                this.loadItems();
            })
            .catch((error) =>
                console.error("Error occured when trying to delete", error)
            );
    };

    handleOnSearch = (event) => {
        event.preventDefault();
        let searchTerm = event.target.search.value.toLowerCase();
        let matchedItems = this.state.items.filter((item) => item.name.toLowerCase().includes(searchTerm));
        this.setState({
            itemsToShow: matchedItems,
        });
    };

    loadItems = () => {
        // axios call to get list of warehouses from api
        axios
            .get(api.apiUrl + api.warehouseEndpoint)
            .then((response) => {
                this.setState({
                    items: response.data,
                    itemsToShow: response.data,
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

    render() {
        // Spinner component to display in case
        // axios call takes long
        let items = <Spinner />;

        if (this.state.items) {
            items = this.state.itemsToShow.map((item) => {
                return (
                    <WarehouseItem
                        key={item.id}
                        {...item}
                        itemType="Warehouse"
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
            <div className="warehouse-list">
                <div className="warehouse-list__top">
                    <h1 className="warehouse-list__title">Warehouses</h1>
                    <form
                        className="warehouse-list__search"
                        onSubmit={(event) => {
                            this.handleOnSearch(event);
                        }}
                    >
                        <input
                            className="warehouse-list__input button"
                            name="search"
                            type="text"
                            placeholder="Search..."
                        />
                        <button className="warehouse-list__search-button">
                            <img src={searchIcon} alt="search" />
                        </button>
                    </form>
                    <Link to="/warehouse/add" className="warehouse-list__add">
                        <button className="button warehouse-list__add-button">
                            + Add new warehouse
                        </button>
                    </Link>
                </div>
                <div className="warehouse-list__content">
                    <div className="warehouse-list__label">
                        <div className="warehouse-list__column-heading warehouse-list__column-heading--main">
                            <p className="warehouse-list__item-item-name warehouse-list__item">
                                Warehouse
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-list__sort-icon"
                            />
                        </div>
                        <div className="warehouse-list__column-heading warehouse-list__column-heading--address">
                            <p className="warehouse-list__item-address warehouse-list__item">
                                Address
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-list__sort-icon"
                            />
                        </div>
                        <div className="warehouse-list__column-heading">
                            <p className="warehouse-list__item-contact-name warehouse-list__item">
                                Contact Name
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-list__sort-icon"
                            />
                        </div>
                        <div className="warehouse-list__column-heading warehouse-list__column-heading--contact ">
                            <p className="warehouse-list__item-contact-info warehouse-list__item">
                                Contact information
                            </p>
                            <img
                                src={sortIcon}
                                alt="sort"
                                className="warehouse-list__sort-icon"
                            />
                        </div>
                        <p className="warehouse-list__column-heading warehouse-list__column-heading--action warehouse-list__item">
                            Actions
                        </p>
                    </div>
                    <ul className="warehouse-list__list">{items}</ul>
                </div>

                {modal}
            </div>
        );
    }
}

export default WarehouseList;
