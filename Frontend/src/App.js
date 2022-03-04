/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import  Register  from './components/auth/Register';
import  Login  from './components/auth/Login';
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
  <Router>
      <Fragment>
        <Navbar />
          <Route exact path='/' component={Landing}></Route>
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
  </Provider>
  );
}
export default App;
