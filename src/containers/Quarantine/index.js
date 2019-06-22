import React from 'react';
import './style.scss';
import Form from './Form'


class Quarantine extends React.Component {
	componentDidMount() {
		console.log('rendering Quarantine')
	}
  handleSubmit = (model) => {
    console.log(model)
    
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

export default Quarantine;

// export default reduxForm({
//   form: 'Bookingform'
// })(Form)