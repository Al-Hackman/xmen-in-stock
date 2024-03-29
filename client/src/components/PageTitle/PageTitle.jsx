import React from "react";
import { Link } from "react-router-dom";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/edit-white-24px.svg";
import './PageTitle.scss';

const handleOnCancel = (event, props) => {
    event.preventDefault();

    props.history.goBack();
}

function PageTitle(props) {  
    
    let editButton = props.editBtn && props.itemType
        ? <Link to={`/${props.itemType}/edit/${props.itemId}`} className="page-title__link">
            <button className="button page-title__button" type="submit">
            <img className="page-title__button-icon" src={editIcon} alt="edit icon" />
                <span className="button page-title__button--text">Edit</span>
            </button>
        </Link>
        : <></>

    return (
        <div className="page-title">
            <button className="page-title__return">
                <img
                    className="page-title__return--icon"
                    src={backArrowIcon}
                    alt="back arrow icon"
                    onClick={(event) => handleOnCancel(event, props)}
                />
            </button>
            <h1 className="page-title__title">{props.title}</h1>
            {editButton}
        </div>
    );
}

export default PageTitle;
