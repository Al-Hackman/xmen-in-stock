import React from 'react'
import './modal.scss'

function Modal(props) {
    return (
        <section className="modal">
               {props.children}
        </section>
    )
}

export default Modal;
