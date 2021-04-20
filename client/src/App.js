import React from "react";
import "./styles/global.scss";
import { Switch, Route } from "react-router-dom";
import "./styles/global.scss";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseForm from "./components/WarehouseForm/WarehouseForm";

class App extends React.Component {
    render() {
        return (
            <>
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={(props) => <WarehouseList {...props} />}
                    />
                    <Route
                        path="/"
                        render={(props) => <WarehouseForm {...props} />}
                    />
                </Switch>
            </>
        );
    }
}
export default App;
