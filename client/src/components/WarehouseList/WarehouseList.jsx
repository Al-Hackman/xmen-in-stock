import React from "react";
import { Link } from "react-router-dom";
import ListItem from "../WarehouseItem/WarehouseItem";
import axios from "axios";
import api from "../../utils/api";
import Spinner from "../Spinner/Spinner";

class WarehouseList extends React.Component {
    state = {
        items: [],
    };

    componentDidMount = () => {
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
        let items = <Spinner />;

        if (this.state.items) {
            items = this.state.items.map((item) => {
                return <ListItem key={item.id} {...item} />;
            });
        }
        console.log(items);

        return (
            <div className="warehouse-list">
                <div className="warehouse-list__top">
                    <h1 className="warehouse-list__title">Warehouses</h1>
                    <form>
                        <input type="text" placeholder="Search..." />
                    </form>
                    <Link to="/new-warehouse" className="warehouse-list__add">
                        <button className="warehouse-list__add-button">Add new warehouse</button>
                    </Link>
                </div>
                <div className="warehouse-list__list">
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
                    <ul>{items}</ul>
                </div>
            </div>
        );
    }
}

export default WarehouseList;
