import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, simpleSelect, Timer, renderTextarea } from '../../components/ReduxFormComponents';


class Form extends Component {
  componentDidMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    // this.props.initialize(nextProps.initialState)
  }
  
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
                name="man_power"
                component={renderField}
                type="number" 
                label='Man Power' 
                placeholder='Man Power' 
              />

              <Field
                name="chilling_capacity"
                component={renderField} 
                label='Chilling Capactiy' 
                placeholder='Chilling Capacity' 
              />
              <Field
                name="packaging"
                component={renderField} 
                label='Packing Information' 
                placeholder='Packing information' 
              />
              <Field
                name="time"
                component={Timer}
                type="text" 
                label='Time of vehicle availibility' 
                placeholder='Time' 
              />
              <Field
                name="vehicle_availability"
                component={simpleSelect} 
                selectOptions={[{value: true, name:'Yes'}, {value: false, name:'No'} ]} 
                label='Vehicle Availibility' 
                placeholder='Vehicle Availibility' 
              />
              <Field
                name="vehicle_information"
                component={renderField} 
                label='Vehicle Info' 
                placeholder='Vehicle info' 
                // validate={[isRequired]}
              />
              <Field
                name="hot_weight"
                component={renderField} 
                label='Hot Weight' 
                placeholder='Hot Weight' 
                // validate={[isRequired]}
              />
              <Field
                name="loading_weight"
                component={renderField} 
                label='Loading Weight' 
                placeholder='Loading Weight' 
                // validate={[isRequired]}
              />
              <Field
                name="documents_weight"
                component={renderField} 
                label='Documents Weight' 
                placeholder='Documents Weight' 
                // validate={[isRequired]}
              />
              <Field
                name="airline_weight"
                component={renderField} 
                label='Airline Weight' 
                placeholder='Airline Weight' 
                // validate={[isRequired]}
              />
              <Field
                name="customer_weight"
                component={renderField} 
                label='Customer Weight' 
                placeholder='Customer Weight' 
                // validate={[isRequired]}
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