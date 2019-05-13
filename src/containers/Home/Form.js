import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired } from '../../components/ReduxFormComponents';


class Form extends Component {
  handleSubmit = (model) => {
    console.log(model)
  }
	render() {
		return (
			<div id="home">
				<Container>
					<h2 className="text-center">Form</h2>
          <form onSubmit={this.props.handleSubmit}>
            <Field name="hours" component={renderField} type="number" label='Hours' validate={[isRequired]} />
            <button type='submit'>Submit</button>
          </form>
				</Container>
			</div>
		);
	}
}
export default reduxForm({
  form: 'Bookingform'
})(Form)