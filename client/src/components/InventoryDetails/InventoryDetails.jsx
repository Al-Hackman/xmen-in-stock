import React from "react";
import { Link } from "react-router-dom";
import "./inventoryDetails.scss";
import arrow from "../../assets/icons/chevron_right-24px.svg";
import ItemAction from "../ItemAction/ItemAction";

function InventoryDetails(props) {
    const status =
        props.status === "In Stock"
            ? "inventory-list-item__instock-tag"
            : "inventory-list-item__out-of-stock-tag";

    return (
        <li className="inventory-list-item divider--top">
            <div className="inventory-list-item__top">
                <div className="inventory-list-item__left">
                    <h2 className="inventory-list-item__label">
                        INVENTORY ITEM
                    </h2>
                    <Link
                        to={`/inventory/single/${props.id}`}
                        className="inventory-list-item__link inventory-list-item__link--main"
                    >
                        {props.itemName}
                        <img
                            src={arrow}
                            alt="right arrow"
                            className="inventory-list-item__link-icon"
                        />
                    </Link>
                    <h2 className="inventory-list-item__label">CATEGORY</h2>
                    <p className="inventory-list-item__text inventory-list-item__category">
                        {props.category}
                    </p>
                </div>
                <div className="inventory-list-item__right">
                    <h2 className="inventory-list-item__label">STATUS</h2>
                    <div className="inventory-list-item__text">
                        <p
                            className={`inventory-list-item__text-status ${status}`}
                        >
                            {props.status}
                        </p>
                    </div>
                    <h2 className="inventory-list-item__label">QTY</h2>
                    <p className="inventory-list-item__text inventory-list-item__text--qty">
                        {props.quantity}
                    </p>
                    <h2 className="inventory-list-item__label">WAREHOUSE</h2>
                    <p className="inventory-list-item__text">
                        {props.warehouseName}
                    </p>
                </div>
            </div>
            <ItemAction
                handleToggleModal={props.handleToggleModal}
                {...props}
                itemType="inventory"
            />
        </li>
    );
}

export default InventoryDetails;
