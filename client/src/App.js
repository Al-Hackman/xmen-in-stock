import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';
import WarehouseList from './components/WarehouseList/WarehouseList';

class App extends React.Component {

  render() {
    return (
      <>
          <Switch>
            <Route path="/" exact render={(props)=><WarehouseList {...props}/>}/>
          </Switch>
      </>
    );
  }
}
export default App;
