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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './style.scss'


class ProductionDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: true,
      authenticated: false,
      orders: [],
      selectedStatus: 'pending',
      dropdownOpen: false,
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
  fetchNew = () => {
    this.setState({ orders: [] })
    axios.get(`${config.apiUrl}/api/production_dept?status=${this.state.selectedStatus}`)
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
    axios.put(`${config.apiUrl}/api/production_dept/${id}`, { status: 'completed' })
      .then(() => {
        this.setState({ orders: [] }, () => {
          this.fetchNew()
        })
      })
  }
  acceptProduction(id) {
    axios.put(`${config.apiUrl}/api/production_dept/${id}`, { status: 'inProgress' })
      .then(() => {
        this.setState({ orders: [] }, () => {
          this.fetchNew()
        })
      })
  }
  rejectProduction(id) {
    axios.put(`${config.apiUrl}/api/production_dept/${id}`, { status: 'rejected' })
      .then(() => {
        this.setState({ orders: [] }, () => {
          this.fetchNew()
        })
      })
  }
  // rejectProduction(id) {
  //   axios.put(`${config.apiUrl}/api/production_dept/${id}`, { status: 'rejected' })
  // }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  sendToDriver = (id, prodId) => {
    axios.post(`${config.apiUrl}/api/drivers`,{order: id})
    .then(() => {
      axios.put(`${config.apiUrl}/api/production_dept/${prodId}`, { status: 'completed' })
      .then(() => {
        this.setState({ orders: [] }, () => {
          this.fetchNew()
        })
      })
    })
  }
  render() {
    const { orders, selectedStatus } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h3 className='pl-3 bold'>Production Dashboard</h3>
        <p className='pl-3 space-4'>Scroll Horizontally to view details of all placed orders</p>
        <div style={{ height: '75px' }}>
          <div style={{ width: '100%' }} className='text-center'>
            <p className='inline-block'>Showing</p>
            <Dropdown style={{ textAlign: 'center', display: 'inline-block' }} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className={'dropdownButton'} caret>
                {this.state.selectedStatus}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => { this.setState({ selectedStatus: 'pending' }, () => { this.fetchNew('pending') }) }}>Pending</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ selectedStatus: 'inProgress' }, () => { this.fetchNew('inProgress') }) }}>In Progress</DropdownItem>
                <DropdownItem onClick={() => { this.setState({ selectedStatus: 'completed' }, () => { this.fetchNew('completed') }) }}>Completed</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <p className='inline-block'>entries</p>
          </div>
        </div>
        {selectedStatus != 'pending' && <div class="productionDashWrapper table-responsive table-striped">
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Order Mode</th>
                {/* <th>Carcass Weight</th> */}
                <th>Mode of Delivery</th>
                <th>Date of flight</th>
                <th>Date of delivery</th>
                <th>Approved By Manager</th>
                <th>Resources</th>
                {selectedStatus != 'completed' && <th>Send to Driver</th>}
                {/* <th>Reject</th> */}
                {/* {user && user.department == 'manager' && <th>Actions</th>} */}
              </tr>
            </thead>
            <tbody>
              {
                orders.length ? orders.map((order, index) => {
                  return <tr>
                    <td>{
                      order.order.order_items.map((item,index) => {
                        return <div>
                          <h6>{item.item}</h6>
                          <p>{item.carcass_weight} KGs</p>
                        </div>
                    })
                    }</td>
                    <td>{order.order.mode}</td>
                    {/* <td>{order.order.carcase_weight}</td> */}
                    <td>{order.order.mode_of_delivery}</td>
                    <td>{moment(order.order.flight_date).format('LL')}</td>
                    <td>{moment(order.order.date_of_delivery).format('LL')}</td>
                    <td>{order.order.isApprove ? 'Yes' : 'No'}</td>
                    <td>
                      {
                        <div>
                          <button onClick={() => { this.addResources(order._id) }}>Add/Edit Resources</button>
                        </div>
                      }
                      {
                        <div>
                          <button onClick={() => { this.showDetails(order._id, 'production') }}>View Production Resources</button>
                        </div>
                      }
                      
                      {
                        <div>
                          <button onClick={() => { this.showDetails(order.order.quarantine_team._id, 'quarantine') }}>View Quarantine Resources</button>
                        </div>
                      }
                      {
                        <div>
                          <button onClick={() => { this.showDetails(order.order.documentation_team._id, 'documentation') }}>View Documentation Resources</button>
                        </div>
                      }
                    </td>
                    {/* {user && user.department == 'manager' && <td><button className='button'>Approve Now</button></td>} */}
                    {selectedStatus != 'completed' && <td>
                      {/* {order.status == 'inProgress' && <button onClick={() => { this.completeProduction(order._id) }}>Complete From Production</button>} */}
                      {
                        // order.status == 'completed' && 
                      <button onClick={() => { this.sendToDriver(order.order._id, order._id) }}>Send To Driver</button>
                      }
                    </td>}
                    {/* <td><button onClick={() => { this.rejectProduction(order._id) }}>Reject</button></td> */}
                  </tr>
                }) : <tr><td colSpan='8'>No Entries Found</td></tr>
              }
            </tbody>
          </table>
        </div>
        }
        {
          selectedStatus == 'pending' &&
          <div className="productionDashWrapper table-responsive table-striped">
            <table class="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Order Mode</th>
                  {/* <th>Carcass Weight</th> */}
                  <th>Mode of Delivery</th>
                  <th>Date of flight</th>
                  <th>Date of delivery</th>
                  <th>Accept</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.length ? orders.map((order, index) => {
                    return <tr>
                      <td>{
                      order.order.order_items.map((item,index) => {
                        return <div>
                          <h6>{item.item}</h6>
                          <p>{item.carcass_weight} KGs</p>
                        </div>
                    })
                    }</td>
                      <td>{order.order.mode}</td>
                      {/* <td>{order.order.carcase_weight}</td> */}
                      <td>{order.order.mode_of_delivery}</td>
                      <td>{moment(order.order.flight_date).format('LL')}</td>
                      <td>{moment(order.order.date_of_delivery).format('LL')}</td>
                      <td><button onClick={() => { this.acceptProduction(order._id) }}>Accept</button></td>
                      {/* <td>{order.order.isApprove ? 'Yes' : 'No'}</td> */}
                      {/* <td>{<div><button onClick={() => { this.addResources(order._id) }}>Add/Edit Resources</button></div>} */}
                      {/* {<div><button onClick={() => { this.showDetails(order._id, 'documentation') }}>View Documentation Resources</button></div>}</td> */}
                      {/* {user && user.department == 'manager' && <td><button className='button'>Approve Now</button></td>} */}
                      {/* <td><button onClick={() => { this.completeDocumentation(order._id) }}>Complete From Documentation</button></td> */}
                      <td><button onClick={() => { this.rejectProduction(order._id) }}>Reject</button></td>
                    </tr>
                  }) : <tr><td colSpan='8'>No Entries Found</td></tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}


export default withRouter(connect(store => {
  return {
    user: store.users.user,
  }
})(ProductionDashboard))