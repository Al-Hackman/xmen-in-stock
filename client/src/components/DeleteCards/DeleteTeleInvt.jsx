import React from 'react';
import './deleteTeleInvt.scss';
import closeXIcon from '../../assets/icons/close-24px.svg'

function DeleteTeleInvt() {
    return (
        
               <div className="delete-invt">
                <img className="delete-invt__icon" src={closeXIcon} alt="close X icon"/>
                <h1 className="delete-invt__title">Delete Television inventory item?</h1>
                <p className="delete-invt__paragraph">Please confirm that you'd like to delete Television from the inventory list.  You won't be able to undo this action</p>
            <div className="delete-invt__button-wrap">
                <button className="delete-invt__button-cancel" type="submit">Cancel</button>
                <button className="delete-invt__button" type="submit">Delete</button>
            </div>  
        </div>
        
    )
}


export default DeleteTeleInvt;
