import React from 'react'
import './modal.scss'

function Modal(props) {
    return (
        <section className="modal" onClick={(event)=>props.handleOnClick(event)}>
               {props.children}
        </section>
    )
}

export default Modal;
