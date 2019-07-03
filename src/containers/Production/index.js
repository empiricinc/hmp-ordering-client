import React from 'react';
import './style.scss';
import Form from './Form'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import config from "../../config";

class ProductionForm extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 initialState: {},
		}
	}
	
  handleSubmit = (model) => {
		console.log(model)
		if(model.vehicle_availability === 'false') {
			model.vehicle_availability = false;
		} else if (model.vehicle_availability === 'true') {
			model.vehicle_availability = true;
		}
		axios.put(`${config.apiUrl}/api/production_dept/${this.orderId}`, model)
	}
	componentDidMount() {
		const {match} = this.props;
		this.orderId = match.params.id;
		axios.get(`${config.apiUrl}/api/production_dept/${this.orderId}`)
		.then((response) => {
			if(response.data.vehicle_availability === false) {
				response.data.vehicle_availability = 'false';
			} else if (response.data.vehicle_availability === true) {
				response.data.vehicle_availability = 'true';
			}
			this.setState({initialState: response.data, initialzed: true})
		})
	}
	render() {
		const {initialState, initialzed} = this.state;
		return (
			<div className='homeContainer' id="home">
				{initialzed && <Form initialValues={initialState} onSubmit={this.handleSubmit}/>}
			</div>
		);
	}
}

export default withRouter(connect(store => {
  return{
    user: store.users.user,
    
  }
})(ProductionForm))