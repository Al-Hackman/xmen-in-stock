import React from 'react';

function DeleteTeleInvt() {
    return (
        <section className="f21as-19">
                <h1 className="f21as-19__title">Delete Television inventory item?</h1>
                <p className="f21as-19__paragraph">Please confirm that you'd like to delete Television from the inventory list.  You won't be able to undo this action</p>
            <div className="f21as-19__button-wrap">
                <button className="f21as-19__button-cancel" type="submit">Cancel</button>
                <button className="f21as-19__button" type="submit">Save</button>
            </div>  
        </section>
    )
}

export default DeleteTeleInvt;
