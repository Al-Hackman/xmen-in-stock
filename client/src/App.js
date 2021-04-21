import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseForm from "./components/WarehouseForm/WarehouseForm";
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
                        path="/add-warehouse"
                        render={(props) => <WarehouseForm {...props} />}
                    />
                </Switch>
            </>
        );
    }
}
export default App;
