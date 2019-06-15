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
    console.log('Start swiping...', event);
  }
 
  onSwipeMove = (position, event) => {
    console.log(`Moved ${position.x} pixels horizontally`, event);
    console.log(`Moved ${position.y} pixels vertically`, event);
  }
 
  onSwipeEnd = (event) => {
		this.toggle();
    // console.log('End swiping...', event);
  }

	render () {
		const {isOpen} = this.state;
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
	          {/* <NavbarToggler onClick={this.toggle} />
	          <NavbarBrand href="/">CRA Boilerplate</NavbarBrand>
						<NavbarBrand href="/">CRA</NavbarBrand> */}
						<Swipe
							onSwipeStart={this.onSwipeStart}
							onSwipeMove={this.onSwipeMove}
							onSwipeEnd={this.onSwipeEnd}>
	          <div className={isOpen ? 'navBarOpen' : 'navBarClose'} navbar>
							<div className='text-center'>
								<img className='logo' src={require('../../static/logo-hmp.png')} alt=""/>
							</div>
	            <Nav className="ml-auto" navbar>
	              <NavItem className='headerNavItem'>
	                <NavLink href="/">Home</NavLink>
	              </NavItem>
	              <NavItem className='headerNavItem'>
	                <NavLink href="/about">About</NavLink>
	              </NavItem>
	            </Nav>
	          </div>
						{isOpen ? <div onClick={this.toggle} className='backDrop'></div> : null}
						</Swipe>
	        </div>
        </>
	    </header>
	  )
	}
}

export default Header;