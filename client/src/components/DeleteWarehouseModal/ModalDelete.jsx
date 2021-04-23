import React from 'react'
import './modalDelete.scss'

function ModalDelete(props) {
    return (
            <section className="delete-warehouse-parent">
               {props.children}
            </section>
    )
}

export default ModalDelete
