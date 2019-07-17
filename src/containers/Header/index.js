import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Container } from 'reactstrap';
import './style.scss'
import Swipe from 'react-easy-swipe';
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import axios from 'axios'

const routes = [
	{
		name: 'New Order',
		routes: '/order'
	},
	{
		name: 'Order Dashboard',
		routes: '/order/dashboard'
	},
	{
		name: 'Documentation Dashboard',
		routes: '/documentation/dashboard'
	},
	{
		name: 'Production Dashboard',
		routes: '/production/dashboard'
	},
	{
		name: 'Quarantine Dashboard',
		routes: '/quarantine/dashboard'
	},
	{
		name: 'Stock Dashboard',
		routes: '/stock/dashboard'
	},
	{
		name: 'New Stock',
		routes: '/stockForm'
	},
	{
		name: 'Driver Dashboard',
		routes: '/driver/dashboard'
	},
]


class Header extends Component {

	constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
	}
	
	onSwipeStart = (event) => {
  }
 
  onSwipeMove = (position, event) => {
  }
 
  onSwipeEnd = (event) => {
		this.toggle();
  }

	render () {
		const {isOpen} = this.state;
		const {user} = this.props;
		console.log(user);
		
		return (
	    <header>
	    	<>
					<div className='space-4 navbar-light' color="faded" light expand="md">
						<div className='row no-margin headerParent'>
							<div onClick={this.toggle} className='col-4'>
								<div className='togglerClass navbar-toggler-icon'></div>
							</div>
							<div className='col-4 text-center'>
								<div>
									<img className='headerLogo' src={require('../../static/logo-hmp.png')} alt=""/>
								</div>
							</div>
							<div className='col-4'></div>
						</div>
	          <div className={isOpen ? 'navBarOpen' : 'navBarClose'} navbar>
							<div className='text-center'>
								<img className='logo' src={require('../../static/logo-hmp.png')} alt=""/>
							</div>
							<Nav className="ml-auto" navbar>
							{
								// user && user.accessiblePaths && user.accessiblePaths.map((item) => {
								// 	return (
								// 	<NavItem className='headerNavItem'>
								// 		<NavLink href={`${item.route}`}>{item.name}</NavLink>
								// 	</NavItem>)
								// })
								routes.map((item) => {
									return (
									<NavItem className='headerNavItem'>
										<NavLink href={`${item.routes}`}>{item.name}</NavLink>
									</NavItem>)
								})
							}
							{user && user.user ? <NavItem onClick={() => {
								Cookies.remove('hmp_auth_token');
								axios.defaults.headers.common['Authorization'] = ``
							}
								} className='headerNavItem'>
										<NavLink href={`/`}>Logout</NavLink>
							</NavItem> :
							<NavItem className='headerNavItem'>
								<NavLink href={`/login`}>Login</NavLink>
							</NavItem>
							}
						</Nav>
	          </div>
						<Swipe
							onSwipeStart={this.onSwipeStart}
							onSwipeMove={this.onSwipeMove}
							onSwipeEnd={this.onSwipeEnd}>
						{isOpen ? <div onClick={this.toggle} className='backDrop'></div> : null}
						</Swipe>
	        </div>
        </>
	    </header>
	  )
	}
}

export default withRouter(connect(store => {
	return {
		user: store.users,
	}
})(Header));