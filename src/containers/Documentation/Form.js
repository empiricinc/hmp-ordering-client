import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, FileInput, Timer } from '../../components/ReduxFormComponents';


class Form extends Component {
  handleSubmit = (model) => {
    console.log(model)
    let images = [];
    model.file.forEach((file) => {

      const reader = new FileReader();
      reader.onload = () => {
          const fileAsBase64 = reader.result.substr(reader.result.indexOf(",") + 1);
          images.push(fileAsBase64);
      };

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsDataURL(file);
  });
  console.log(images);
  }
	render() {
		return (
			<div className='homeContainer' id="home">
				<Container>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-fixed-submit'>
              <h5>Flight Information</h5>
              <Field
                name="notes"
                component={renderField}
                type="text" 
                label='Airline' 
                placeholder='Airline' 
                validate={[isRequired]}
              />
              <Field
                name="flight_name"
                component={renderField}
                type="text" 
                label='Flight Name' 
                placeholder='Name of Flight' 
                validate={[isRequired]}
              />
              <Field
                name="flight_time"
                component={Timer}
                type="text" 
                label='Flight Time' 
                placeholder='Time of Flight' 
                validate={[isRequired]}
              />
              <Field
                name="flight_location"
                component={renderField}
                type="text" 
                label='Flight Location' 
                placeholder='Location of Flight' 
                validate={[isRequired]}
              />
              <Field
                name="halal_certificate"
                component={FileInput}
                type="file" 
                label='Halal Certificate' 
                placeholder='Halal Certificate' 
                validate={[isRequired]}
              />
              <Field
                name="invoice"
                component={FileInput}
                type="file" 
                label='Invoice' 
                placeholder='Invoice' 
                validate={[isRequired]}
              />
              <Field
                name="date"
                component={renderField}
                type="date" 
                label='Date of delivery' 
                placeholder='Date of Delivery' 
                validate={[isRequired]}
              />
              <Field
                name="form_e"
                component={FileInput}
                type="file" 
                label='Form-E' 
                placeholder='Form E' 
                validate={[isRequired]}
              />
              <Field
                name="driver_name"
                component={renderField}
                type="text" 
                label='Driver Name' 
                placeholder='Name of Driver' 
                validate={[isRequired]}
              />
              <Field
                name="delivery_time"
                component={Timer}
                type="text" 
                label='Delivery Time' 
                placeholder='Time of Delivery' 
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