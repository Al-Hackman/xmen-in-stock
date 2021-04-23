import React from "react";
import backArrowIcon from "../../assets/icons/arrow_back-24px.svg";
import './PageTitle.scss';

const handleOnCancel = (event, props) => {
    event.preventDefault();

    props.history.goBack();
}

function PageTitle(props) {
    return (
        <div className="page-title">
            <button className="page-title__return">
                <img
                    className="page-title__return-icon"
                    src={backArrowIcon}
                    alt="back arrow icon"
                    onClick={(event) => handleOnCancel(event, props)}
                />
            </button>
            <h1 className="page-title__title">{props.title}</h1>
        </div>
    );
}

export default PageTitle;
