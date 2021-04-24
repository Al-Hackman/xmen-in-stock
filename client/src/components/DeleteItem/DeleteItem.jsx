import React from "react";
import "./DeleteItem.scss";
import closeXIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";
import api from "../../utils/api";

// const handleClickCancel = (event, props) => {
//     event.preventDefault();
//     props.history.goBack();
// };

// const handleDelete = (event, props) => {
//     event.preventDefault();
//     if (props.location.pathname.toLowerCase().includes("warehouse")) {
//         axios.delete(
//             api.apiUrl + api.warehouseEndpoint + "/" + props.match.params.id
//         );
//         props.history.push("/");
//     } else if (props.location.pathname.toLowerCase().includes("inventory")) {
//         axios.delete(
//             api.apiUrl + api.inventoryEndpoint + "/" + props.match.params.id
//         );
//         props.history.push("/");
//     }
// };

function DeleteItem(props) {
    return (
        <div className="delete-item">
            <img
                className="delete-item__icon"
                src={closeXIcon}
                alt="close X icon"
                onClick={(event) => {props.handleOnCancel(event)}}
            />
            <h1 className="delete-item__title">
                Delete {props.item.name} {props.itemType}?
            </h1>
            <p className="delete-item__paragraph">
                Please confirm that you'd like to delete{" "}
                {props.item.name} from the list of {props.itemType}s. You won't
                be able to undo this action
            </p>
            <div className="delete-item__button-wrap">
                <button
                    className="delete-item__button-cancel"
                    onClick={(event) => {
                        props.handleOnCancel(event);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="delete-item__button"
                    onClick={(event) => {
                        props.handleOnDelete(event);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DeleteItem;
