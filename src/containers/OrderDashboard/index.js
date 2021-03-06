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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: true,
      authenticated: false,
      orders: [],
      selectedStatus: 'inProgress',
    }
  }
  componentDidMount() {
    axios.get(`${config.apiUrl}/api/order?isApprove=true`)
      .then((response) => {
        this.setState({
          orders: response.data
        })
      })
  }
  fetchNew(status) {
    axios.get(`${config.apiUrl}/api/order?isApprove=${true}&isCompleted=${this.state.selectedStatus == 'completed' ? true : false }`)
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
      .then((response) => {
        window.alert('Order has been approved')
        this.fetchNew();
      })
  }
  rejectOrder(id) {
    axios.put(`${config.apiUrl}/api/order/approve/${id}`)
      .then((response) => {
        window.alert('Order has been approved')
        this.fetchNew();
      })
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  render() {
    const { orders } = this.state;
    const { user } = this.props;
    return (
      <React.Fragment>
        <h3 className='pl-3 bold'>Order Dashboard</h3>
        <p className='pl-3 space-4'>Scroll Horizontally to view details of all placed orders</p>
        <div style={{ height: '75px' }}>
          <div style={{ width: '100%' }} className='text-center'>
            <p className='inline-block'>Showing</p>
            <Dropdown style={{ textAlign: 'center', display: 'inline-block' }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className={'dropdownButton'} caret>
                {this.state.selectedStatus}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => { this.setState({ selectedStatus: 'inProgress' }, () => { this.fetchNew('inProgress') }) }}>inProgress</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ selectedStatus: 'completed' }, () => { this.fetchNew('completed') }) }}>completed</DropdownItem>
            </DropdownMenu>
            </Dropdown>
            <p className='inline-block'>entries</p>
          </div>
        </div>
      <div class="orderDashWrapper pl-3 table-responsive table-striped">
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Order Mode</th>
              <th>Carcass Weight</th>
              <th>Mode of Delivery</th>
              <th>Date of flight</th>
              <th>Date of delivery</th>
              <th>Production Status</th>
              <th>Documentation Status</th>
              <th>Quarantine Status</th>
              {/* <th>Approved</th> */}
              {/* {user && user.department == 'manager' && <th>Actions</th>} */}
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order, index) => {
                return <tr>
                  <td>{
                    order.order_items.map((item, index) => {
                      return <div>
                        <h6>{item.item}</h6>
                        <p>{item.carcass_weight} KGs</p>
                      </div>
                    })
                  }</td>
                  <td>{order.mode}</td>
                  <td>{order.carcase_weight}</td>
                  <td>{order.mode_of_delivery}</td>
                  <td>{moment(order.flight_date).format('LL')}</td>
                  <td>{moment(order.date_of_delivery).format('LL')}</td>
                  <td>{order.production_team.status}</td>
                  <td>{order.documentation_team.status}</td>
                  <td>{order.quarantine_team.status}</td>
                  {/* <td>{order.isApprove ? 'Yes' : 'No'}</td> */}
                  {/* {user && user.department == 'manager' && 
            <td>
              <button onClick={ () => {this.approveOrder(order._id)} } className='button'>
                Approve 
              </button>
              <button onClick={ () => {this.approveOrder(order._id)} } className='button'>
                Reject
              </button>
            </td>
            } */}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
    )
  }
}


export default withRouter(connect(store => {
  return {
    user: store.users.user,
  }
})(Home))