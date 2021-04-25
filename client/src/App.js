import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import EditInventory from "./components/EditInventory/EditInventory";
import InventoryItem from "./components/InventoryItem/InventoryItem";
import InventoryList from "./components/InventoryList/InventoryList";



class App extends React.Component {
    render() {
        return (
            <>
                <Header />
                <main>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={(props) => <WarehouseList {...props} />}
                        />
                        <Route
                            path="/warehouse/single/:id"
                            exact
                            render={(props) => <WarehouseDetails {...props} />}
                        />
                        <Route
                            path="/warehouse/edit/:id"
                            exact
                            render={(routerProps) => (
                                <EditWarehouse {...routerProps} />
                            )}
                        />
                        <Route
                            path="/warehouse/add"
                            exact
                            render={(routerProps) => (
                                <EditWarehouse {...routerProps} isNew />
                            )}
                        />
                        <Route
                            path="/inventory"
                            exact
                            render={(props) => <InventoryList {...props} />}
                        />                    
                        <Route
                            path="/inventory/edit/:id"
                            exact
                            render={(props) => <EditInventory {...props} />}
                        />
                        <Route
                            path="/inventory/add"
                            exact
                            render={(props) => <EditInventory {...props} isNew />}
                        />
                        <Route
                            path="/inventory/single/:id"
                            render={(props) => <InventoryItem {...props} />}
                        />
                    </Switch>
                </main>
                <Footer />
            </>
        );
    }
}
export default App;
