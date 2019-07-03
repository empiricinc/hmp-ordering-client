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
import moment from 'moment'


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: true,
      authenticated: false,
      orders: [],
    }
  }
  componentDidMount() {
    axios.get(`${config.apiUrl}/api/order`)
    .then((response) => {
      this.setState({
        orders: response.data
      })
    })
  }
  componentWillRecieveProps(nextProps) {
  }
  approveOrder(id) {
    axios.put(`${config.apiUrl}/api/order/approve/${id}`)
  }
  render() {
    const {orders} = this.state;
    const {user} = this.props;
    return(
    <div class="table-responsive">          
  <table class="table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Order Mode</th>
        <th>Mode of Delivery</th>
        <th>Date of flight</th>
        <th>Date of delivery</th>
        <th>Approved</th>
        {user && user.department == 'manager' && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {
        orders.map((order, index) => {
          return <tr>
            <td>{order.product_type}</td>
            <td>{order.mode}</td>
            <td>{order.mode_of_delivery}</td>
            <td>{moment(order.flight_date).format('LL')}</td>
            <td>{moment(order.date_of_delivery).format('LL')}</td>
            <td>{order.isApprove ? 'Yes' : 'No'}</td>
            {user && user.department == 'manager' && <td><button onClick={ () => {this.approveOrder(order._id)} } className='button'>Approve Now</button></td>}
          </tr>
        })
      }
    </tbody>
  </table>
  </div>
  )
  }
}


export default withRouter(connect(store => {
  return{
    user: store.users.user,
  }
})(Home))