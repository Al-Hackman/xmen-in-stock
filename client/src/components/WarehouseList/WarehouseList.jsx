import React from "react";
import { Link } from "react-router-dom";
import ListItem from "../WarehouseItem/WarehouseItem";
import axios from "axios";
import api from "../../utils/api";
import Spinner from "../Spinner/Spinner";
import "./WarehouseList.scss";
import searchIcon from "../../assets/icons/search-24px.svg";

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
                console.log(response.data);
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
                return <ListItem key={item.id} {...item} itemType="Warehouse"/>;
            });
        }

        return (
            <div className="warehouse-list">
                <div className="warehouse-list__top">
                    <h1 className="warehouse-list__title">Warehouses</h1>
                    <form className="warehouse-list__search">
                        <input
                            className="warehouse-list__input"
                            name="search"
                            type="text"
                            placeholder="Search..."
                        />
                        <button className="button warehouse-list__search-button">
                            <img src={searchIcon} alt="search" />
                        </button>
                    </form>
                    <Link to="/new-warehouse" className="warehouse-list__add">
                        <button className="warehouse-list__add-button">
                            Add new warehouse
                        </button>
                    </Link>
                </div>
                <div className="warehouse-list__content">
                    <div className="warehouse-list__label">
                        <p className="warehouse-list__item-item-name warehouse-list__item">
                            Warehouse
                        </p>
                        <p className="warehouse-list__item-address warehouse-list__item">
                            Address
                        </p>
                        <p className="warehouse-list__item-contact-name warehouse-list__item">
                            Contact Name
                        </p>
                        <p className="warehouse-list__item-contact-info warehouse-list__item">
                            Contact information
                        </p>
                    </div>
                    <ul className="warehouse-list__list">{items}</ul>
                </div>
            </div>
        );
    }
}

export default WarehouseList;
