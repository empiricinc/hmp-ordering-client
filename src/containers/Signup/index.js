import React from 'react';
import './style.scss';
import Form from './Form'
import config from '../../config'
import axios from "axios";
import Swal from 'sweetalert2';


class Home extends React.Component {
  handleSubmit = (model) => {
		console.log(model);
		axios.post(`${config.apiUrl}/api/users`, model)
		.then((response) => {
			Swal.fire({
				position: 'center',
				type: 'success',
				title: 'Sign Up Successful',
				showConfirmButton: false,
			})
			// console.log(response);
		})
		.catch((error) => {
			console.log(error);
		})
    
  }
	render() {
		return (
			<div className='homeContainer' id="home">
				{/* <img className='logo' src={require('../../static/logo-hmp.png')} alt=""/> */}
				<Form onSubmit={this.handleSubmit}/>
			</div>
		);
	}
}

export default Home;

// export default reduxForm({
//   form: 'Bookingform'
// })(Form)