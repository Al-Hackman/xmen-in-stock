import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';
import WarehouseForm from './components/WarehouseForm/WarehouseForm';

class App extends React.Component {

  render() {
    return (
      <>
      <WarehouseForm />
          <Switch>
            <Route />
          </Switch>
      </>
    );
  }
}
export default App;

