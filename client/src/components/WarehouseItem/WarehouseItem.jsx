import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editItem from "../../assets/icons/edit-24px.svg";
import "./WarehouseItem.scss";

const ListItem = (props) => {
    return (
        <li className="item">
            <div className="item__left">
                <h2 className="item__label">{props.itemType}</h2>
                <Link to={props.name} className="item__text">
                    {props.name}
                </Link>
                <h2 className="item__label">Address</h2>
                <p className="item__text">{props.address}</p>
            </div>
            <div className="item__right">
                <h2 className="item__label">Contact Name</h2>
                <p className="item__text">{props.contact.name}</p>
                <h2 className="item__label">Contact Information</h2>
                <p className="item__text">{props.contact.phone}</p>
                <p className="item__text">{props.contact.email}</p>
            </div>
            <div className="item__bottom">
                <button className="item__button">
                    <img
                        src={deleteIcon}
                        alt="delete item"
                        className="item__icon"
                        onClick={(event) => {
                            props.handleOnDelete(event);
                        }}
                    />
                </button>
                <button className="item__button">
                    <img
                        src={editItem}
                        alt="edit item"
                        className="item__icon"
                        onClick={(event) => {
                            props.handleOnEdit(event);
                        }}
                    />
                </button>
            </div>
        </li>
    );
};

export default ListItem;
