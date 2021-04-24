import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editItem from "../../assets/icons/edit-24px.svg";
import "./WarehouseItem.scss";
import arrow from "../../assets/icons/chevron_right-24px.svg";

const WarehouseItem = (props) => {
    return (
        <li className="item divider--top">
            <div className="item__top">
                <div className="item__left">
                    <h2 className="item__label">{props.itemType}</h2>
                    <Link
                        to={`/warehouse/${props.name}`}
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
            <div className="item__bottom">
                <button
                    className="item__button"
                    onClick={(event) => {
                        props.handleToggleModal(event, props);
                    }}
                >
                    <img
                        src={deleteIcon}
                        alt="delete item"
                        className="item__icon"
                    />
                </button>

                <Link to={`/edit-warehouse/${props.id}`}>
                    <button className="item__button">
                        <img
                            src={editItem}
                            alt="edit item"
                            className="item__icon"
                        />
                    </button>
                </Link>
            </div>
        </li>
    );
};

export default WarehouseItem;
