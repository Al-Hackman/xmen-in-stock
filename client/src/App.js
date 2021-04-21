import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import AddWarehouse from "./components/AddWarehouse/AddWarehouse";
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
            {/* <Route 
              path="/edit-warehouse" 
              render={(routerProps) =><WarehouseForm {...routerProps}/>}
            /> */}
            <Route  
              path="/add-warehouse" 
              render={(routerProps) =><AddWarehouse {...routerProps}/>}
            />
          </Switch>
      </>
    );
  }

}
export default App;
