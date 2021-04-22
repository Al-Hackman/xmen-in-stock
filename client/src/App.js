import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import EditInventory from "./components/EditInventory/EditInventory";
import Modal from "./components/DeleteCards/Modal";
import DeleteTeleInvt from "./components/DeleteCards/DeleteTeleInvt";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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
                            path="/edit-warehouse/:id"
                            render={(routerProps) => (
                                <EditWarehouse
                                    {...routerProps}
                                />
                            )}
                        />
                        <Route
                            path="/add-warehouse"
                            render={(routerProps) => (
                                <EditWarehouse
                                    {...routerProps}
                                    isNew
                                />
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
                            path="/edit-inventory"
                            render={(routerProps) => (
                                <EditInventory {...routerProps} />
                            )}
                        />
                    </Switch>
                </main>
                <Footer />
            </>
        );
    }
}
export default App;
