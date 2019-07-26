import React from "react";
import { withRouter } from 'react-router-dom';
// import store, { history } from './configureStore';
import axios from "axios";
import config from "../../config";
import { connect } from "react-redux";
import moment from 'moment'
import './style.scss'


class QuarantineDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: true,
      authenticated: false,
      orders: [],
    }
  }
  componentDidMount() {
    axios.get(`${config.apiUrl}/api/stock?status=pending`)
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
    this.props.history.push(`/quarantineForm/${id}`)

  }
  showDetails(id, department) {
    // console.log(this.props);
    this.props.history.push(`/details/${department}/${id}`)

  }
  completeQuarantine(id) {
    axios.put(`${config.apiUrl}/api/doc_team/${id}`, {status: 'complete'})
  }
  rejectQuarantine(id) {
    axios.put(`${config.apiUrl}/api/doc_team/${id}`, {status: 'rejected'})
  }
  render() {
    const {orders} = this.state;
    const {user} = this.props;
    return(
    <div class="quarantineDashWrapper table-responsive table-striped">  
    
    <h3 className='pl-3 bold'>Documentation Dashboard</h3>
        <p className='pl-3 space-4'>Scroll Horizontally to view details of all placed orders</p>        
  <table class="table">
    <thead>
      <tr>
        <th>GRN</th>
        <th>Mandi</th>
        <th>Procured By</th>
        <th>Total Animals</th>
        <th>Added on</th>
        <th>View Details</th>
      </tr>
    </thead>
    <tbody>
      {
        orders.map((order, index) => {
          return <tr>
            <td>{order.grn}</td>
            <td>{order.mandi}</td>
            <td>{order.procured_by}</td>
            <td>{order.total_animals}</td>
            <td>{moment(order.createdAt).format('LL')}</td>
            <td><button onClick={() => this.showDetails(order._id, 'stock')}>View Details</button></td>
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
})(QuarantineDashboard))