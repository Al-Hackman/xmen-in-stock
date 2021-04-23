import React from 'react';
import './deleteWarehouseModal.scss';
import closeXIcon from '../../assets/icons/close-24px.svg';

function DeleteWarehouseModal() {
    
    return (
        <div className="delete-warehouse">
                <img className="delete-warehouse__icon" src={closeXIcon} alt="close X icon"/>
                <h1 className="delete-warehouse__title">Delete XXXXX XXXXXX  Warehouse?</h1>
                <p className="delete-warehouse__paragraph">Please confirm that you'd like to delete XXXXXX from the warehouses. You won't be able to undo this action</p>
            <div className="delete-warehouse__button-wrap">
                <button className="delete-warehouse__button-cancel" type="submit">Cancel</button>
                <button className="delete-warehouse__button" type="submit">Delete</button>
            </div>  
        </div>
    )
}

export default DeleteWarehouseModal;
