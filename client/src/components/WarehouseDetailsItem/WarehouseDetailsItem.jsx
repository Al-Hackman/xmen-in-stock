import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editItem from "../../assets/icons/edit-24px.svg";
import "./warehouseDetailsItem.scss";
import arrow from "../../assets/icons/chevron_right-24px.svg";
import ItemAction from "../ItemAction/ItemAction";

const WarehouseDetailsItem = (props) => {
    const status =
        props.status === "In Stock"
            ? "detail-item__instock-tag"
            : "detail-item__out-of-stock-tag";
    return (
        <li className="detail-item divider--top">
            <div className="detail-item__top">
                <div className="detail-item__left">
                    <h2 className="detail-item__label">{props.itemType}</h2>
                    <Link
                        to={`/inventory/${props.id}`}
                        className="detail-item__link detail-item__link--main"
                    >
                        {props.itemName}
                        <img
                            src={arrow}
                            alt="right arrow"
                            className="detail-item__link-icon"
                        />
                    </Link>
                    <h2 className="detail-item__label">Category</h2>
                    <p className="detail-item__text detail-item__category">
                        {props.category}
                    </p>
                </div>
                <div className="detail-item__right">
                    <h2 className="detail-item__label">Status</h2>
                    <div className="detail-item__text">
                        <p className={status}>{props.status}</p>
                    </div>
                    <h2 className="detail-item__label">Qty</h2>
                    <div className="detail-item__link-container">
                        <Link
                            to={`tel:${props.quantity}`}
                            className="detail-item__link"
                        >
                            {props.quantity}
                        </Link>
                    </div>
                </div>
            </div>
            <ItemAction
                handleToggleModal={props.handleToggleModal}
                {...props}
                itemType="inventory"
            />
        </li>
    );
};

export default WarehouseDetailsItem;
