import React from "react";
import { Link } from "react-router-dom";
import WarehouseItem from "../WarehouseItem/WarehouseItem";
import axios from "axios";
import api from "../../utils/api";
import Spinner from "../Spinner/Spinner";
import "./WarehouseList.scss";
import searchIcon from "../../assets/icons/search-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";

class WarehouseList extends React.Component {
    // state to store current list of items
    state = {
        items: [],
    };

    componentDidMount = () => {
        // axios call to get list of warehouses from api
        axios
            .get(api.apiUrl + api.warehouseEndpoint)
            .then((response) => {
                this.setState({
                    items: response.data,
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

    render() {
        // Spinner component to display in case
        // axios call takes long
        let items = <Spinner />;

        if (this.state.items) {
            items = this.state.items.map((item) => {
                return (
                    <WarehouseItem key={item.id} {...item} itemType="Warehouse" />
                );
            });
        }

        return (
            <div className="warehouse-list">
                <div className="warehouse-list__top">
                    <h1 className="warehouse-list__title">Warehouses</h1>
                    <form className="warehouse-list__search">
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
                    <Link to="/add-warehouse" className="warehouse-list__add">
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
            </div>
        );
    }
}

export default WarehouseList;
