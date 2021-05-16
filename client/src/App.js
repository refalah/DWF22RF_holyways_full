import React, {useContext, useEffect} from 'react'
import {UserContext} from './contexts/userContext'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {UserContextProvider} from './contexts/userContext'
import {ModalContextProvider} from './contexts/modalContext'
import {API, setAuthToken} from './config/api'

import Navbar from './components/Navbar/Navbar'
import ModalRegister from './components/Modal/ModalRegister'
import ModalLogin from './components/Modal/ModalLogin'

import './App.css';
import PrivateRoute from "./components/PrivateRoute";
import Home from './components/pages/Home/Home';
import DonateDetail from './components/pages/DonateDetail/DonateDetail';
import RaiseFund from './components/pages/RaiseFund/RaiseFund';
import Profile from './components/pages/Profile/Profile';
import NewFund from './components/pages/NewFund/NewFund';
import ViewFund from './components/pages/ViewFund/ViewFund';

import ScrollIntoView from "./components/ScrollIntoView";
import EditFund from './components/pages/EditFund/EditFund'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  // const [state, dispatch] = useContext(UserContext);

  // const checkUser = async () => {
  //   try {
  //     const response = await API.get('/check-auth');

  //     if (response.status === 404) {
  //       return dispatch({
  //         type: "AUTH_ERROR"
  //       })
  //     };

  //     let payload = response.data.data.user;
  //     payload.token = localStorage.token;

  //     dispatch({
  //       type: "AUTH_SUCCESS",
  //       payload
  //     })

  //   } catch (error) {
  //     dispatch({
  //       type: "AUTH_ERROR"
  //     })
  //   }
  // }

  // useEffect(() => {
  //   checkUser();
  // }, []);

  return (
    <>
      <UserContextProvider>
      <Router>
        
          <Navbar/>
        
        <ScrollIntoView>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <PrivateRoute path='/profile' exact component={Profile}></PrivateRoute>
            <PrivateRoute path='/raise-fund' exact component={RaiseFund}></PrivateRoute>
            <PrivateRoute path='/new-fund' exact component={NewFund}></PrivateRoute>
            <PrivateRoute path='/fund/:id' exact component={ViewFund}></PrivateRoute>
            <PrivateRoute path='/edit-fund/:id' exact component={EditFund}></PrivateRoute>
            <PrivateRoute path='/donate-detail/:id' exact component={DonateDetail}></PrivateRoute>
          </Switch>
        </ScrollIntoView>
        
      </Router>
      </UserContextProvider>
     
    </>
  );
}

export default App;
