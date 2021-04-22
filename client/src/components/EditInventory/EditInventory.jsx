import React from "react";
import "./EditInventory.scss";

class EditInventory extends React.Component {
    state = {
        inStock: false,
        itemId: "",
    }




    componentDidMount = () => {
        if (!this.props.isNew) {
            console.log("need to load existing item details")
        }
    }

    render = () => {
        return (
            <div className="edit-inventory">
                
            </div>
        );
    };
}

export default EditInventory;
