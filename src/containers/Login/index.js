import React from 'react';
import './style.scss';
import Form from './Form'
import config from '../../config'
import axios from "axios";
import Cookies from "js-cookie";


class Login extends React.Component {
  handleSubmit = (model) => {
		console.log(model)
		axios.post(`${config.apiUrl}/auth/local`, model)
		.then((response) => {
			Cookies.set('hmp_auth_token', response.data.token);
			window.location = `/`
		})
		.catch((error) => {
			console.log(error);
		})
    
  }
	render() {
		return (
			<div className='loginContainer' id="home">
				<img className='logo' src={require('../../static/logo-hmp.png')} alt=""/>
				<Form onSubmit={this.handleSubmit}/>
			</div>
		);
	}
}

export default Login;

// export default reduxForm({
//   form: 'Bookingform'
// })(Form)