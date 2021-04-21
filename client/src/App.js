import React from 'react';
import './styles/global.scss';
import {Switch, Route} from "react-router-dom";
import './App.css';
import WarehouseForm from './components/WarehouseForm/WarehouseForm';

class App extends React.Component {

  render() {
    return (
      <>
      <WarehouseForm />
          <Switch>
            <Route path="/edit-warehouse" render={(routerProps) =><WarehouseForm {...routerProps}/>}/>
            <Route  path="/add-new-warehouse" render={(routerProps) =><WarehouseForm {...routerProps}/>}/>
          </Switch>
      </>
    );
  }
}
export default App;

