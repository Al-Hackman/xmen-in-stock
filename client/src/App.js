import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import Modal from "./components/Modal/Modal";
import DeleteTeleInvt from "./components/DeleteCards/DeleteTeleInvt";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
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
                            path="/warehouse"
                            render={(props) => <WarehouseList {...props} />}
                        />
                        <Route
                            path="/edit-warehouse/:id"
                            render={(routerProps) => (
                                <EditWarehouse {...routerProps} />
                            )}
                        />
                        <Route
                            path="/add-warehouse"
                            render={(routerProps) => (
                                <EditWarehouse {...routerProps} isNew />
                            )}
                        />
                        <Route
                            path="/invt-delete"
                            render={(routerProps) => (
                                <Modal>
                                    <DeleteTeleInvt {...routerProps} />
                                </Modal>
                            )}
                        />
                        <Route
                            path="/inventories"
                            render={(props) => <InventoryList {...props} />}
                        />                    
                                     
                        <Route
                            path="/edit-inventory/:id"
                            render={(props) => <EditInventory {...props} />}
                        />
                        <Route
                            path="/add-inventory"
                            render={(props) => <EditInventory {...props} isNew />}
                        />
                        <Route
                            path="/inventory/:id"
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
