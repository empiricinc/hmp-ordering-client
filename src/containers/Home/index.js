import React from 'react';
import './style.scss';
import Form from './Form'


class Home extends React.Component {
  handleSubmit = (model) => {
    console.log(model)
    
  }
	render() {
		return (
			<div id="home">
				<Form onSubmit={this.handleSubmit}/>
			</div>
		);
	}
}

export default Home;

// export default reduxForm({
//   form: 'Bookingform'
// })(Form)