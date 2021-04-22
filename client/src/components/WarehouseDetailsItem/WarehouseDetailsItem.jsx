import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editItem from "../../assets/icons/edit-24px.svg";
import "./warehouseDetailsItem.scss";
import arrow from "../../assets/icons/chevron_right-24px.svg";

const WarehouseDetailsItem = (props) => {
    return (
        <li className="detail-item divider--top">
            <div className="detail-item__top">
                <div className="detail-item__left">
                    <h2 className="detail-item__label">{props.itemType}</h2>
                    <Link
                        to={props.name}
                        className="detail-item__link detail-item__link--main"
                    >
                        {props.name}
                        <img src={arrow} alt="right arrow" className="detail-item__link-icon"/>
                    </Link>
                    <h2 className="detail-item__label">Address</h2>
                    <p className="detail-item__text detail-item__address">{props.address}</p>
                </div>
                <div className="detail-item__right">
                    <h2 className="detail-item__label">Contact Name</h2>
                    <p className="detail-item__text">{props.contact.name}</p>
                    <h2 className="detail-item__label">Contact Information</h2>
                    <div className="detail-item__link-container">
                        <Link
                            to={`tel:${props.contact.phone}`}
                            className="detail-item__link"
                        >
                            {props.contact.phone}
                        </Link>
                        <Link
                            to={`mailto:${props.contact.email}`}
                            className="detail-item__link"
                        >
                            {props.contact.email}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="detail-item__bottom">
                <button className="detail-item__button">
                    <img
                        src={deleteIcon}
                        alt="delete item"
                        className="detail-item__icon"
                        onClick={(event) => {
                            props.handleOnDelete(event);
                        }}
                    />
                </button>
                <button className="detail-item__button">
                    <img
                        src={editItem}
                        alt="edit item"
                        className="detail-item__icon"
                        onClick={(event) => {
                            props.handleOnEdit(event);
                        }}
                    />
                </button>
            </div>
        </li>
    );
};

export default WarehouseDetailsItem;
