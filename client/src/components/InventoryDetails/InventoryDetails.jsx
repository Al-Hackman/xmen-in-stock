import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editItem from "../../assets/icons/edit-24px.svg";
import "./inventoryDetails.scss";
import arrow from "../../assets/icons/chevron_right-24px.svg";




function InventoryDetails(props) {

    const status = props.status === "In Stock" ? "inventory-item__instock-tag" : "inventory-item__out-of-stock-tag"

    return (
        <li className="inventory-item divider--top">
            <div className="inventory-item__top">
                <div className="inventory-item__left">
                    <h2 className="inventory-item__label">INVENTORY ITEM</h2>
                    <Link
                        to={`/inventory/${props.itemName}`}
                        className="inventory-item__link inventory-item__link--main"
                    >
                        {props.itemName}
                        <img
                            src={arrow}
                            alt="right arrow"
                            className="inventory-item__link-icon"
                        />
                    </Link>
                    <h2 className="inventory-item__label">CATEGORY</h2>
                    <p className="inventory-item__text inventory-item__address">{props.category}</p>
                </div>
                <div className="inventory-item__right">
                    <h2 className="inventory-item__label">STATUS</h2>
                    <div className ="inventory-item__text"><p className={`inventory-item__text-status ${status}`}>{props.status}</p></div>
                    <h2 className="inventory-item__label">QTY</h2>
                    <p className="inventory-item__text inventory-item__text--qty">{props.quantity}</p>
                    <h2 className="inventory-item__label">WAREHOUSE</h2>
                    <p className="inventory-item__text">{props.warehouseName}</p>
                </div>
            </div>
            <div className="inventory-item__bottom">
                <Link to={`/inventory/delete/${props.id}`}>
                <button className="inventory-item__button">
                    <img
                        src={deleteIcon}
                        alt="delete item"
                        className="inventory-item__icon"
                    />
                </button>
                </Link>

                <Link to={`/edit-warehouse/${props.id}`}>
                    <button className="inventory-item__button">
                        <img
                            src={editItem}
                            alt="edit item"
                            className="inventory-item__icon"
                        />
                    </button>
                </Link>
            </div>
        </li>
    );
};

export default InventoryDetails;
