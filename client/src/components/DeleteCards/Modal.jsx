import React from 'react'
import './modal.scss'

function Modal(props) {
    return (
        <section className="delete-invt-parent">
               {props.children}
        </section>
    )
}

export default Modal;
