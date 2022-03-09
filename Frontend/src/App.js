/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import  Register  from './components/auth/Register';
import  Login  from './components/auth/Login';
import  Home from './components/Home/Home';
import UserProfile from './components/dashboard/UserProfile';
import EditUser from './components/dashboard/EditUser';
import { Fragment, useEffect } from 'react';
import { Landing } from './components/layout/Landing';
import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
//import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import productDetails from "./components/Product/ProductDetails";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
          //store.dispatch(loadUser())
  },[]);
  // return (
  //   <div className="App">
  //     <Navbar />
  //   <p>Hello</p>
  // </div>
  // );
  return (
  <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options}>
  <Router>
      <Fragment>
        <Navbar />
          <Route exact path='/' component={Home}></Route>
          <Route exact path="/product/:productid" component={productDetails}></Route>
          <section className='container'>
          <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/UserProfile" component={UserProfile} />
              <Route exact path="/EditUser" component={EditUser} />
            </Switch>
          </section>
      </Fragment>
  </Router>
  </AlertProvider>
  </Provider>
  );
}
export default App;
