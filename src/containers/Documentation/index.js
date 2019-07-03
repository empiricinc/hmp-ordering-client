
import React from 'react';
import './style.scss';
import Form from './Form'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import config from "../../config";
import { promised } from 'q';

const instance = axios.create({
	baseURL: 'https://api.cloudinary.com/v1_1/hmp/image/upload',
	timeout: 1000000,
});
class Home extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			 initialzed: false,
		}
	}

	
	
  handleSubmit = (model) => {
		console.log(model)
		delete model.halal_certificate;
		delete model.invoice_generation;
		delete model.form_e;
		const filesToUpload = [{name: 'halal_certificate' , file:model.halal_certificate}, {name: 'invoice_generation' , file:model.invoice_generation},{name: 'form_e' , file:model.form_e},];
		var filesUrls = {};
		const uploaders = filesToUpload.map((file) => {
			if(file.file) {
					let params = new URLSearchParams();
					params.append('upload_preset', 'iawxhtp4')
					params.append('api_key', config.apiKey,)
					params.append('file', file.file)
					return axios({
						url: 'https://api.cloudinary.com/v1_1/hmp/image/upload',
						method: 'post',
						transformRequest: [(data, headers) => {
							delete headers.common.Authorization
							return data
					}],
						data: params,
				})
					.then((response) => {
						console.log('single response', response);
						return filesUrls[file.name] = response.data.secure_url
					})
			} else {
				var promise = new Promise((res, rej)=>{res(); return true});
				return promise
			}
		})
		axios.all(uploaders)
		.then(response => {
			axios.put(`${config.apiUrl}/api/doc_team/${this.orderId}`, model)
			console.log('all response', response)
		})
		.catch()

	}
	componentDidMount() {
		const {match} = this.props;
		this.orderId = match.params.id;
		axios.get(`${config.apiUrl}/api/doc_team/${this.orderId}`)
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
				{/* <img className='logo' src={require('../../static/logo-hmp.png')} alt=""/> */}
				{initialzed && <Form initialValues={initialState} onSubmit={this.handleSubmit}/>}
			</div>
		);
	}
}

export default Home;

// export default reduxForm({
//   form: 'Bookingform'
// })(Form)