import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseForm from "./components/WarehouseForm/WarehouseForm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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
              render={(routerProps) =><WarehouseForm {...routerProps}/>}
            />
            <Route  
              path="/add-warehouse" 
              render={(routerProps) =><WarehouseForm {...routerProps}/>}
            />
          </Switch>

          <Footer />
      </>
    );
  }

}
export default App;
