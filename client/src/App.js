import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseForm from "./components/WarehouseForm/WarehouseForm";
import Modal from "./components/DeleteCards/Modal";
import DeleteTeleInvt from "./components/DeleteCards/DeleteTeleInvt";


class App extends React.Component {


  render() {
    return (
      <>
      <WarehouseForm />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <WarehouseList {...props} />}
            />
            <Route 
              path="/edit-warehouse" 
              render={(routerProps) =><WarehouseForm {...routerProps}/>}
            />
            <Route  
              path="/add-warehouse" 
              render={(routerProps) =><WarehouseForm {...routerProps}/>}
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
