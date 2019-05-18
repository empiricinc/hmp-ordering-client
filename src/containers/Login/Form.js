import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, simpleSelect, Timer, renderTextarea } from '../../components/ReduxFormComponents';


class Form extends Component {
  handleSubmit = (model) => {
    console.log(model)
  }
	render() {
		return (
			<div className='homeContainer' id="home">
				<Container>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-fixed-submit'>
              <Field
                name="email"
                component={renderField} 
                label='email'
                type="text" 
                placeholder='Email Address' 
                validate={[isRequired]}
              />
              <Field
                name="password"
                component={renderField}
                type="text" 
                label='password' 
                placeholder='Password' 
                validate={[isRequired]}
              />
            </div>
            <button className='btn-block btn-hmp-red' type='submit'>Login</button>
          </form>
				</Container>
			</div>
		);
	}
}
export default reduxForm({
  form: 'Bookingform'
})(Form)