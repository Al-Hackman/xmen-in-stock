import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
<<<<<<< HEAD
import WarehouseForm from "./components/WarehouseForm/WarehouseForm";
import Modal from "./components/DeleteCards/Modal";
import DeleteTeleInvt from "./components/DeleteCards/DeleteTeleInvt";
import Header from "./components/Header/Header";
=======
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import Modal from "./components/DeleteCards/Modal";
import DeleteTeleInvt from "./components/DeleteCards/DeleteTeleInvt";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
>>>>>>> f02d99a9ac0ef992104d28d65fd9f82a978319c1

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
                    </Switch>
                </main>
                <Footer />
            </>
        );
    }
}
export default App;
