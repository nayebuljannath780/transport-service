import './App.css';
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import VehicleTransport from './Component/VehicleTransport/VehicleTransport';
import { createContext, useState } from 'react';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <div className="App">
      <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <PrivateRoute path="/vehicle/:vehicleName">
              <VehicleTransport />
            </PrivateRoute>
            <PrivateRoute path="/destination">
                <VehicleTransport></VehicleTransport>
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </userContext.Provider>
    </div>

  );
}

export default App;
