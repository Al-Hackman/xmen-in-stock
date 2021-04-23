import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import Modal from "./components/DeleteCards/Modal";
import DeleteTeleInvt from "./components/DeleteCards/DeleteTeleInvt";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
<<<<<<< HEAD
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
=======
import EditInventory from "./components/EditInventory/EditInventory";
import InventoryItem from "./components/InventoryItem/InventoryItem";
import DeleteWarehouseModal from "./components/DeleteWarehouseModal/DeleteWarehouseModal";
import ModalDelete from "./components/DeleteWarehouseModal/ModalDelete";
import InventoryList from "./components/InventoryList/InventoryList";


>>>>>>> 5c9ad2199c98e9d3c30cc612b18504f770f29272

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
                            path="/warehouse/:id"
                            render={(props) => <WarehouseDetails {...props} />}
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
<<<<<<< HEAD
=======

                        <Route
                            path="/warehouse-delete"
                            render={(routerProps) => ( <ModalDelete><DeleteWarehouseModal {...routerProps} /></ModalDelete>
                            )}
                        />

                        <Route
                            path="/inventory"
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
>>>>>>> 5c9ad2199c98e9d3c30cc612b18504f770f29272
                    </Switch>
                </main>
                <Footer />
            </>
        );
    }
}
export default App;
