import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { withRouter } from 'react-router-dom';
// import store, { history } from './configureStore';
import axios from "axios";
import Cookies from 'js-cookie'
import config from "../../config";
import { setUserInfo } from '../../actions/users'
import { connect } from "react-redux";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: true,
      authenticated: false,
    }
  }
  componentDidMount() {
  }
  componentWillRecieveProps(nextProps) {
  }
  render() {

    const { authenticated, authenticating } = this.state;
    if( authenticated && !authenticating ) {
      return (
        <div>Dashboad</div>
      )
    } else {
      return <div>Dashboad</div>
    }
  }
}


export default withRouter(connect(store => {
  return{
    user: store.users.user,
  }
})(Home))