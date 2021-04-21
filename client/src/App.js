import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseForm from "./components/WarehouseForm/WarehouseForm";

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
          </Switch>
      </>
    );
  }

}
export default App;
