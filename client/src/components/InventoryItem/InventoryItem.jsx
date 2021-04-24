import React from "react";
import axios from "axios";
import api from "../../utils/api";
import "./InventoryItem.scss";
import PageTitle from "../PageTitle/PageTitle";

class InventoryItem extends React.Component {
    state = {
        item: {},
    }

    componentDidMount = () => {
        // axios call to get list of warehouses from api
        axios
            .get(api.apiUrl + api.inventoryEndpoint + "/" + this.props.match.params.id)
            .then((response) => {
                this.setState({
                    item: response.data,
                });
            })
            .catch((error) =>
                console.error(
                    `Error on axios GET to ${api.apiUrl + api.inventoryEndpoint}`,
                    error
                )
            );
    };

    render() {

        const status = this.state.item.status === "In Stock" ? "inventory-item__instock-tag" : "inventory-item__out-of-stock-tag"
        return (
            <section className="inventory-item">
                <PageTitle 
                title={this.state.item.itemName} 
                {...this.props} 
                editBtn 
                itemId={this.state.item.id}/>
                <div className="inventory-item__container">
                    <div className="inventory-item__wrap">
                        <h2 className="inventory-item__heading">
                            ITEM DESCRIPTION:
                        </h2>
                        <p className="inventory-item__text">{this.state.item.description}</p>
                        <h2 className="inventory-item__heading">
                            CATEGORY:
                        </h2>
                        <p className="inventory-item__text">{this.state.item.category}</p>
                    </div>
                    <div className="inventory-item__wrap">
                        <div className="inventory-item__row">
                            <div className="inventory-item__left">
                                <h2 className="inventory-item__heading inventory-item__row-spacing">
                                    STATUS:
                                </h2>
                                <p className={`inventory-item__text ${status}`}>{this.state.item.status}</p>
                            </div>
                            <div className="inventory-item__right">
                                <h2 className="inventory-item__heading ">
                                    QUANTITY:
                                </h2>
                                <p className="inventory-item__text">{this.state.item.quantity}</p>
                            </div>
                        </div>
                        <h2 className="inventory-item__heading">
                            WAREHOUSE:
                            </h2>
                        <p className="inventory-item__text">{this.state.item.warehouseName}</p>

                    </div>
                </div>
            </section>
        )
    }
}
export default InventoryItem;