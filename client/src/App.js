import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import AddWarehouse from "./components/AddWarehouse/AddWarehouse";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import Modal from "./components/DeleteCards/Modal";
import DeleteTeleInvt from "./components/DeleteCards/DeleteTeleInvt";
import Header from "./components/Header/Header";


class App extends React.Component {
   
  render() {
    return (
      <>
                <Header />
      
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <WarehouseList {...props} />}
            />
            <Route 
              path="/edit-warehouse" 
              render={(routerProps) =><EditWarehouse {...routerProps}/>}
            />
            <Route  
              path="/add-warehouse" 
              render={(routerProps) =><AddWarehouse {...routerProps}/>}
            />

            <Route  
              path="/invt-delete" 
              render={(routerProps) =><Modal><DeleteTeleInvt {...routerProps}/></Modal>}
            />
          </Switch>
      </>
    );
  }

}
export default App;
