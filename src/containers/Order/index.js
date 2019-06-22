import React from 'react';
import './style.scss';
import Form from './Form'
import axios from 'axios'
import config from '../../config';


class Home extends React.Component {
  handleSubmit = (model) => {
    axios.post(`${config.apiUrl}/api/order`, model)
    .then((response) => {
      console.log(response)
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