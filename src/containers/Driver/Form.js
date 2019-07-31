import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import config from "../../config";
import axios from "axios";

// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, simpleSelect, Timer, renderTextarea, FileInput } from '../../components/ReduxFormComponents';


class Form extends Component {
  handleSubmit = (model) => {
  }
	render() {
		return (
			<div className='homeContainer' id="home">
				<Container>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-fixed-submit'>
              <Field
                name="name"
                component={renderField}
                type="text" 
                label='Name of Driver' 
                placeholder='Name of Driver' 
                validate={[isRequired]}
              />
              <Field
                name="phone"
                component={renderField}
                type="number" 
                label='Contact no. of Driver' 
                placeholder='Contact no. of Driver' 
                validate={[isRequired]}
              />
              <Field
                name="delivery_date"
                component={renderField}
                type="date" 
                label='Date of Delivery' 
                placeholder='Date of Delivery' 
                validate={[isRequired]}
              />
              <Field
                name="delivery_time"
                component={Timer}
                type="text" 
                label='Time of Delivery' 
                placeholder='Time of Delivery' 
                //validate={[isRequired]}
              />
              <Field
                name="package_weight"
                component={renderField}
                type="number" 
                label='Weight of Package (in KGs)' 
                placeholder='Weight of Package (in KGs)' 
                validate={[isRequired]}
              />
              <Field
                name="custom_weight"
                component={renderField}
                type="number" 
                label='Customs Weight (in KGs)' 
                placeholder='Customs Weight (in KGs)' 
                validate={[isRequired]}
              />
            </div>
            <button className='btn-block-fixed btn-hmp-red' type='submit'>Submit</button>
          </form>
				</Container>
			</div>
		);
	}
}
export default reduxForm({
  form: 'Bookingform'
})(Form)