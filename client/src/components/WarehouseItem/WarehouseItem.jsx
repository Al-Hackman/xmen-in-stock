import React from "react";
import { Link } from "react-router-dom";
import "./WarehouseItem.scss";
import arrow from "../../assets/icons/chevron_right-24px.svg";
import ItemAction from "../ItemAction/ItemAction";

const WarehouseItem = (props) => {
    return (
        <li className="item divider--top">
            <div className="item__top">
                <div className="item__left">
                    <h2 className="item__label">{props.itemType}</h2>
                    <Link
                        to={`/warehouse/${props.id}`}
                        className="item__link item__link--main"
                    >
                        {props.name}
                        <img
                            src={arrow}
                            alt="right arrow"
                            className="item__link-icon"
                        />
                    </Link>
                    <h2 className="item__label">Address</h2>
                    <p className="item__text item__address">{props.address}</p>
                </div>
                <div className="item__right">
                    <h2 className="item__label">Contact Name</h2>
                    <p className="item__text">{props.contact.name}</p>
                    <h2 className="item__label">Contact Information</h2>
                    <div className="item__link-container">
                        <Link
                            to={`tel:${props.contact.phone}`}
                            className="item__link"
                        >
                            {props.contact.phone}
                        </Link>
                        <Link
                            to={`mailto:${props.contact.email}`}
                            className="item__link"
                        >
                            {props.contact.email}
                        </Link>
                    </div>
                </div>
            </div>
            <ItemAction
                handleToggleModal={props.handleToggleModal}
                {...props}
                itemType="warehouse"
            />
        </li>
    );
};

export default WarehouseItem;
