import React from 'react';
import './style.scss';
import Form from './Form'


class Login extends React.Component {
  handleSubmit = (model) => {
    console.log(model)
    
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