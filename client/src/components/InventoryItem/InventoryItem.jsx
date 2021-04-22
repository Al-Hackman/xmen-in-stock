import React from "react";
import "./InventoryItem.scss";
import PageTitle from "../PageTitle/PageTitle";

class InventoryItem extends React.Component {
    
    render() {
    return (
        <section className="inventory-item">
            <PageTitle title="Television" {...this.props} />
                <div className="inventory-item__container">
                    <div className="inventory-item__wrap">
                        <h2 className="inventory-item__heading">
                            ITEM DESCRIPTION:
                        </h2>
                        <p className="inventory-item__text">{this.props.description}</p>
                        <h2 className="inventory-item__heading">
                            CATEGORY:
                        </h2>
                        <p className="inventory-item__text">{this.props.category}</p>
                    </div>
                    <div className="inventory-item__wrap">
                        <div className="inventory-item__row">
                            <div className="inventory-item__left">
                                <h2 className="inventory-item__heading inventory-item__row-spacing">
                                    STATUS:
                                </h2>
                                <p className="inventory-item__text inventory-item__instock-tag">{this.props.status}</p>
                            </div>
                            <div className="inventory-item__right">
                                <h2 className="inventory-item__heading ">
                                    QUANTITY:
                                </h2>
                                <p className="inventory-item__text">{this.props.quantity}</p>
                            </div>
                        </div>
                            <h2 className="inventory-item__heading">
                                WAREHOUSE:
                            </h2>
                            <p className="inventory-item__text">{this.props.warehouse}</p>
                            
                    </div>
                </div>
        </section>
    )
  }
}
export default InventoryItem;