import React from "react";
import "./deleteWarehouseModal.scss";
import closeXIcon from "../../assets/icons/close-24px.svg";
import axios from "axios";
import api from "../../utils/api";

const handleClickCancel = (event, props) => {
    event.preventDefault();
    props.history.goBack();
};

const handleDelete = (event, props) => {
    event.preventDefault();
    axios.delete(api.apiUrl + api.warehouseEndpoint + props.match.params.id);
    props.history.goBack();
};

function DeleteWarehouseModal(props) {
    console.log(props);
    return (
        <div
            className="delete-warehouse"
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <img
                className="delete-warehouse__icon"
                src={closeXIcon}
                alt="close X icon"
                onClick={(event) => {
                    handleDelete(event, props);
                }}
            />
            <h1 className="delete-warehouse__title">
                Delete {props.match.params.name} Warehouse?
            </h1>
            <p className="delete-warehouse__paragraph">
                Please confirm that you'd like to delete{" "}
                {props.match.params.name} from the list of warehouses. You won't be able
                to undo this action
            </p>
            <div className="delete-warehouse__button-wrap">
                <button
                    className="delete-warehouse__button-cancel"
                    onClick={(event) => {
                        handleClickCancel(event, props);
                    }}
                >
                    Cancel
                </button>
                <button
                    className="delete-warehouse__button"
                    onClick={(event) => {
                        handleDelete(event, props);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default DeleteWarehouseModal;
