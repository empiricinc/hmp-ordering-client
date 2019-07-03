import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, FileInput, Timer } from '../../components/ReduxFormComponents';


class Form extends Component {
  handleSubmit = (model) => {
    
  }
	render() {
		return (
			<div className='homeContainer' id="home">
				<Container>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-fixed-submit'>
              <h5>Flight Information</h5>
              <Field
                name="booking_airline"
                component={renderField}
                type="text" 
                label='Airline' 
                placeholder='Airline' 
                //validate={[isRequired]}
              />
              {/* <Field
                name="flight_name"
                component={renderField}
                type="text" 
                label='Flight Name' 
                placeholder='Name of Flight' 
                //validate={[isRequired]}
              /> */}
              <Field
                name="booking_time"
                component={Timer}
                type="text" 
                label='Flight Time' 
                placeholder='Time of Flight' 
                //validate={[isRequired]}
              />
              <Field
                name="booking_location"
                component={renderField}
                type="text" 
                label='Flight Location' 
                placeholder='Location of Flight' 
                //validate={[isRequired]}
              />
              <Field
                name="halal_certificate"
                component={FileInput}
                type="file" 
                label='Halal Certificate' 
                placeholder='Halal Certificate' 
                //validate={[isRequired]}
              />

              {/* <Field
                name="halal_certificate"
                component={FileInput}
                type="file" 
                label='Halal Certificate' 
                placeholder='Halal Certificate' 
                //validate={[isRequired]}
              /> */}
              <Field
                name="invoice_generation"
                component={FileInput}
                type="file" 
                label='Invoice' 
                placeholder='Invoice' 
                //validate={[isRequired]}
              />
              <Field
                name="doc_creation_date"
                component={renderField}
                type="date" 
                label='Date of delivery' 
                placeholder='Date of Delivery' 
                //validate={[isRequired]}
              />
              <Field
                name="form_e"
                component={FileInput}
                type="file" 
                label='Form-E' 
                placeholder='Form E' 
                //validate={[isRequired]}
              />
              <Field
                name="certificate_of_origin"
                component={FileInput}
                type="file" 
                label='Certificate of Origin' 
                placeholder='Certificate of Origin' 
                //validate={[isRequired]}
              />
              <Field
                name="driver_name"
                component={renderField}
                type="text" 
                label='Driver Name' 
                placeholder='Name of Driver' 
                //validate={[isRequired]}
              />
              <Field
                name="delivery_time"
                component={Timer}
                type="text" 
                label='Delivery Time' 
                placeholder='Time of Delivery' 
                //validate={[isRequired]}
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