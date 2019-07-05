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
		const {match} = this.props;
		this.orderId = match.params.id;
	
		this.state = {
			 initialState: {},
			 editing: !!this.orderId,
		}
	}
	
  handleSubmit = (model) => {
    console.log(model)
		// const filesToUpload = [{name: 'proof_doc' , file:model.proof_doc}];
		// var filesUrls = {};
		// const uploaders = filesToUpload.map((file) => {
		// 	if(file.file, !validURL(file.file)) {
		// 			let params = new URLSearchParams();
		// 			params.append('upload_preset', 'iawxhtp4')
		// 			params.append('api_key', config.apiKey,)
		// 			params.append('file', file.file)
		// 			return axios({
		// 				url: 'https://api.cloudinary.com/v1_1/hmp/image/upload',
		// 				method: 'post',
		// 				transformRequest: [(data, headers) => {
		// 					delete headers.common.Authorization
		// 					return data
		// 			}],
		// 				data: params,
		// 		})
		// 			.then((response) => {
		// 				// console.log('single response', response);
		// 				delete model[file.name];
		// 				return filesUrls[file.name] = response.data.secure_url
		// 			})
		// 	} else {
		// 		var promise = new Promise((res, rej)=>{res(); return true});
		// 		return promise
		// 	}
		// })
		// axios.all(uploaders)
		// .then(response => {
			axios.post(`${config.apiUrl}/api/stock/`, model)
		// 	console.log('all response', response)
		// })
		// .catch()
	}
	componentDidMount() {
		if(this.state.editing) {
			const {match} = this.props;
			this.orderId = match.params.id;
			axios.get(`${config.apiUrl}/api/quarantine_dept/${this.orderId}`)
			.then((response) => {
				if(response.data.vehicle_availability === false) {
					response.data.vehicle_availability = 'false';
				} else if (response.data.vehicle_availability === true) {
					response.data.vehicle_availability = 'true';
				}
				this.setState({initialState: response.data, initialzed: true})
			})
		} else {
			this.setState({initialState: {}, initialzed: true})
		}
	}
	render() {
		const {initialState, initialzed, editing} = this.state;
		return (
			<div className='homeContainer' id="home">
				{initialzed && <Form editing={editing} initialValues={initialState} onSubmit={this.handleSubmit}/>}
			</div>
		);
	}
}

export default withRouter(connect(store => {
  return{
    user: store.users.user,
    
  }
})(QuarantineForm))