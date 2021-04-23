import React from 'react'
import './modal.scss'


const handleClickModal = (props) => {
    props.history.goBack();
}

function Modal(props) {
    return (
        <section className="modal" onClick={()=>{
            handleClickModal(props);
        }}>
               {props.children}
        </section>
    )
}

export default Modal;
