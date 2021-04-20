import React from 'react';
import backArrowIcon from '../../assets/icons/arrow_back-24px.svg'
import './WarehouseForm.scss';

function WarehouseForm() {
    
  
    return (
        <section className="warehouse-form">
            <header className="warehouse-form__header">
            <img className="warehouse-form__icon" src={backArrowIcon} alt="back arrow icon"/>
            <h1 className="warehouse-form__title">Edit Warehouse</h1>
            </header>
            <div className="warehouse-form__container">
                <form className="warehouse-form__form">
                <div className="warehouse-form__wrap">
                    <h2 className="warehouse-form__heading">Warehouse Details</h2>
                    <label className="warehouse-form__label" htmlFor="warehouseNameInput">Warehouse Name
                        <input className="warehouse-form__input" id="warehouseNameInput" name="warehouseNameInput" placeholder="Warehouse Name" type="text" required="" />
                    </label>
                    <label className="warehouse-form__label" htmlFor="warehouseStreetInput">Street Address
                        <input className="warehouse-form__input" id="warehouseStreetInput" name="warehouseStreetInput" placeholder="Street Address" type="text" required="" />
                    </label>
                    <label className="warehouse-form__label" htmlFor="warehouseCityInput">City
                        <input className="warehouse-form__input" id="warehouseCityInput" name="warehouseCityInput" placeholder="City" type="text" required="" />
                    </label>
                    <label className="warehouse-form__label" htmlFor="warehouseCountryInput">Country
                        <input className="warehouse-form__input" id="warehouseCountryInput" name="warehouseCountryInput" placeholder="Country" type="text" required="" />
                    </label>    
                </div>
                <div className="warehouse-form__wrap">
                    <h2 className="warehouse-form__heading">Contact Details</h2>    
                    <label className="warehouse-form__label" htmlFor="contactNameInput">Contact Name
                        <input className="warehouse-form__input" id="contactNameInput" name="contactNameInput" placeholder="Contact Name" type="text" required="" />
                    </label>
                    <label className="warehouse-form__label" htmlFor="contactPositionInput">Position
                        <input className="warehouse-form__input" id="contactPositionInput" name="contactPositionInput" placeholder="Position" type="text" required="" />
                    </label>
                    <label className="warehouse-form__label" htmlFor="contactPhoneInput">Phone Number
                        <input className="warehouse-form__input" id="contactPhoneInput" name="contactPhoneInput" placeholder="Phone Number" type="phone" required="" />
                    </label>
                    <label className="warehouse-form__label" htmlFor="contactEmailInput">Email
                        <input className="warehouse-form__input" id="contactEmailInput" name="contactEmailInput" placeholder="Email" type="email" required="" />
                    </label>
                </div>
                    <div className="warehouse-form__button-wrap">
                        <button className="button warehouse-form__button-cancel" type="submit">Cancel</button>
                        <button className="button warehouse-form__button" type="submit">Save</button>
                    </div>
             </form>              
            </div> 
        </section>
    )
}
   
export default WarehouseForm
