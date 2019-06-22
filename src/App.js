import React, { Component } from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './configureStore';
import axios from "axios";
import Cookies from 'js-cookie'
import config from "./config";
import Home from './containers/Home'
import Login from './containers/Login'
import { Route, Switch } from 'react-router-dom';


// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';


// routes
import routes from './routes';

// header and footer
import Header from './containers/Header'
import Footer from './containers/Footer'

// const Login = React.lazy(() => import('./containers/Login'));
class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
      return (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div className="App">
              <Header />
              <div className="wrap">
              <Route exact path="/login" component={Login}/>
              <Home>
                {routes}
              </Home>
              </div>
              {/* <Footer /> */}
            </div>
          </ConnectedRouter>
        </Provider>
      );
    }
}

export default App;
