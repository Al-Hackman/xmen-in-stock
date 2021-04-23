import React from "react";
import './EditAction.scss';

const handleOnCancel = (event, props) => {
    event.preventDefault();

    props.history.goBack();
}

function EditAction(props) {
    return (
        <div className="edit-action">
            <button
                className="button edit-action__button-cancel"
                onClick={(event) => handleOnCancel(event, props)}
            >
                Cancel
            </button>
            <button className="button edit-action__button" type="submit">
                {props.buttonText}
            </button>
        </div>
    );
}

export default EditAction;
