import React from "react";
import { withRouter } from 'react-router-dom';
// import store, { history } from './configureStore';
import axios from "axios";
import config from "../../config";
import { connect } from "react-redux";
import moment from 'moment'
import './style.scss'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class QuarantineDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticating: true,
      authenticated: false,
      orders: [],
      dropdownOpen: false,
      selectedStatus: 'pending'
    }
  }
  componentDidMount() {
    axios.get(`${config.apiUrl}/api/quarantine_dept?status=pending`)
      .then((response) => {
        this.setState({
          orders: response.data
        })
      })
  }
  fetchNew = () => {
    this.setState({ orders: [] })
    axios.get(`${config.apiUrl}/api/quarantine_dept?status=${this.state.selectedStatus}`)
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
    axios.put(`${config.apiUrl}/api/quarantine_dept/${id}`, { status: 'complete' })
      .then(() => {
        this.setState({ orders: [] }, () => {
          this.fetchNew()
        })
      })
  }
  rejectQuarantine(id) {
    axios.put(`${config.apiUrl}/api/quarantine_dept/${id}`, { status: 'rejected' })
      .then(() => {
        this.setState({ orders: [] }, () => {
          this.fetchNew()
        })
      })
  }
  acceptQuarantine(id) {
    axios.put(`${config.apiUrl}/api/quarantine_dept/${id}`, { status: 'inProgress' })
      .then(() => {
        this.setState({ orders: [] }, () => {
          this.fetchNew()
        })
      })
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }
  render() {
    const { orders, selectedStatus } = this.state;
    const { user } = this.props;
    return (
      <div>
        <h3 className='pl-3 bold'>Quarantine Dashboard</h3>
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
        {selectedStatus != 'pending' && <div class="quarantineDashWrapper table-responsive table-striped">
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
                <th>Complete</th>
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
                          <button onClick={() => { this.showDetails(order._id, 'quarantine') }}>View Quarantine Resources</button>
                        </div>
                      }
                      {
                        <div>
                          <button onClick={() => { this.showDetails(order.order.production_team, 'production') }}>View Production Resources</button>
                        </div>
                      }
                      {
                        <div>
                          <button onClick={() => { this.showDetails(order.order.documentation_team, 'documentation') }}>View Documentation Resources</button>
                        </div>
                      }
                    </td>
                    {/* {user && user.department == 'manager' && <td><button className='button'>Approve Now</button></td>} */}
                    <td><button onClick={() => { this.completeQuarantine(order._id) }}>Complete From Quarantine</button></td>
                    {/* <td><button onClick={() => { this.rejectQuarantine(order._id) }}>Reject</button></td> */}
                  </tr>
                }) : <tr><td colSpan='5'>No entries found</td></tr>
              }
            </tbody>
          </table>
        </div>}
        {
          selectedStatus == 'pending' &&
          <div className="quarantineDashWrapper table-responsive table-striped">
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
                      <td><button onClick={() => { this.acceptQuarantine(order._id) }}>Accept</button></td>
                      <td><button onClick={() => { this.rejectQuarantine(order._id) }}>Reject</button></td>
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
})(QuarantineDashboard))