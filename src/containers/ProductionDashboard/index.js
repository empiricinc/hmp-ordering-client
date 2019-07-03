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
import './style.scss'


class ProductionDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: true,
      authenticated: false,
      orders: [],
    }
  }
  componentDidMount() {
    axios.get(`${config.apiUrl}/api/production_dept?status=pending`)
    .then((response) => {
      this.setState({
        orders: response.data
      })
    })
  }
  componentWillRecieveProps(nextProps) {
  }
  addResources(id) {
    // console.log(this.props);
    this.props.history.push(`/productionForm/${id}`)

  }
  showDetails(id, department) {
    // console.log(this.props);
    this.props.history.push(`/details/${department}/${id}`)

  }
  completeProduction(id) {
    axios.put(`${config.apiUrl}/api/production_dept/${id}`, {status: 'complete'})
  }
  render() {
    const {orders} = this.state;
    const {user} = this.props;
    return(
    <div class="productionDashWrapper table-responsive table-striped">          
  <table class="table">
    <thead>
      <tr>
        <th>Product</th>
        <th>Order Mode</th>
        <th>Mode of Delivery</th>
        <th>Date of flight</th>
        <th>Date of delivery</th>
        <th>Approved By Manager</th>
        <th>Resources</th>
        <th>Complete</th>
        {user && user.department == 'manager' && <th>Actions</th>}
      </tr>
    </thead>
    <tbody>
      {
        orders.map((order, index) => {
          return <tr>
            <td>{order.order.product_type}</td>
            <td>{order.order.mode}</td>
            <td>{order.order.mode_of_delivery}</td>
            <td>{moment(order.order.flight_date).format('LL')}</td>
            <td>{moment(order.order.date_of_delivery).format('LL')}</td>
            <td>{order.order.isApprove ? 'Yes' : 'No'}</td>
            <td>{<div><button onClick={() => {this.addResources(order._id)}}>Add/Edit Resources</button></div>}
            {<div><button onClick={() => {this.showDetails(order._id, 'production')}}>View Production Resources</button></div>}</td>
            {/* {user && user.department == 'manager' && <td><button className='button'>Approve Now</button></td>} */}
            <td><button onClick={() => {this.completeProduction(order._id)}}>Complete From Production</button></td>
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
})(ProductionDashboard))