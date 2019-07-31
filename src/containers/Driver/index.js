import React from 'react';
import './style.scss';
import Form from './Form'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import config from "../../config";
function validURL(str) {
  if(typeof(str) == 'string') {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }else {
    return false
  }
}
class QuarantineForm extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 initialState: {},
		}
	}
	
  handleSubmit = (model) => {
    console.log(model)
		
		// axios.all(uploaders)
		// .then(response => {
			axios.put(`${config.apiUrl}/api/drivers/${this.orderId}`, {...model})
			.then((response) => {
				window.alert('resources added successfully');
				window.location = '/quarantine/dashboard'
				console.log('all response', response)
			})
		// })
		// .catch()
	}
	componentDidMount() {
		const {match} = this.props;
		this.orderId = match.params.id;
		axios.get(`${config.apiUrl}/api/drivers/${this.orderId}`)
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
})(QuarantineForm))