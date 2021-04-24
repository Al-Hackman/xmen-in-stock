import React from 'react'
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editItem from "../../assets/icons/edit-24px.svg";
import { Link } from "react-router-dom";
import './ItemAction.scss'

function ItemAction(props) {
    
    return (
        <div className="item-action">
                <button
                    className="item-action__button"
                    onClick={(event) => {
                        props.handleToggleModal(event, props);
                    }}
                >
                    <img
                        src={deleteIcon}
                        alt="delete item"
                        className="item-action__icon"
                    />
                </button>

                <Link to={`/${props.itemType}/edit/${props.id}`}>
                    <button className="item-action__button">
                        <img
                            src={editItem}
                            alt="edit item"
                            className="item-action__icon"
                        />
                    </button>
                </Link>
            </div>
    )
}

export default ItemAction
