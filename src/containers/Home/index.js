import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { withRouter } from 'react-router-dom';
// import store, { history } from './configureStore';
import axios from "axios";
import Cookies from 'js-cookie'
import config from "../../config";
import { setUserInfo, setAccessiblePaths } from '../../actions/users'
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
    const { history, match, location, user } = this.props;
    const token = Cookies.get('hmp_auth_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${config.apiUrl}/api/users/me`)
    .then((response) => {
    const {data} = response;
    const {location} = this.props;
    if(data.department == 'manager') {
      this.props.dispatch(setUserInfo(data));
      this.props.dispatch(
        setAccessiblePaths([
          {name: 'Order Dashboard', route: '/order/dashboard' },
          {name: 'Production Dashboard', route: '/production/dashboard' },
          {name: 'Documentation Dashboard', route: '/documentation/dashboard' },
          {name: 'Quarantine Dashboard', route: '/quarantine/dashboard' },
          {name: 'Stock Dashboard', route: '/stock/dashboard' }
          ]
        )
      )

      if (location.pathname.split('/').indexOf('dashboard') > -1) {
        this.setState({authenticating: false, authenticated: true, user: data});
      } else {
        history.push(`order/dashboard`)
        this.setState({authenticating: false, authenticated: true, user: data});
      }
    } else {
      var formPathName = `/${data.department}`
      var dashPathName = `/${data.department}/dashboard`
      this.props.dispatch(setAccessiblePaths([{name: 'Add New', route: formPathName }, {name: 'Dashboard', route: dashPathName }]))
      this.setState({authenticating: false, authenticated: true, user: data});
      if(!user) {
        this.props.dispatch(setUserInfo(data));
        if(location.pathname != formPathName && location.pathname != dashPathName) {
          history.push(`/${data.department}`)
        } else {
          history.push(location.pathname)
        }
        
      }
    }
    })
    .catch((error) => {
      if(location.pathname != '/signup') {
        this.setState({authenticating: false, authenticated: false})
        history.push(`/login`)
      } else {
        this.setState({authenticating: false, authenticated: true})
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    // let formPathName = `/${nextProps.user.department}`
    // let dashPathName = `/${nextProps.user.department}/dashboard`
    // if(nextProps.location.pathname != formPathName || nextProps.location.pathname != dashPathName) {
    //   nextProps.history.push(formPathName);
    // }
  }
  render() {

    const { authenticated, authenticating } = this.state;
    if( authenticated && !authenticating ) {
      console.log('rendering children')
      return (
        <div>{this.props.children}</div>
      )
    } else {

      console.log('not rendering children')
      return null
    }
  }
}


export default withRouter(connect(store => {
  return{
    user: store.users.user,
  }
})(Home))