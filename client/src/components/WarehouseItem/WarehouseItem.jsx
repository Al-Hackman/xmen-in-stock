import React from 'react';
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editItem from '../../assets/icons/edit-24px.svg';

const WarehouseItem = (props) => {
    return (
        <div className="item">
            <Link to={props.url} className="item__text">{props.itemName}</Link>
            <p className="item__text">{props.address}</p>
            <p className="item__text">{props.contactName}</p>
            <p className="item__text">{props.contactInfo}</p>
            <button><img src={deleteIcon} alt="delete item"/></button>
            <button><img src={editItem} alt="edit item"/></button>
        </div>
    );
}

export default WarehouseItem;
