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
                name="man_power"
                component={renderField}
                type="number" 
                label='Man Power' 
                placeholder='Man Power' 
                validate={[isRequired]}
              />

              <Field
                name="chilling_capacity"
                component={renderField} 
                label='Chilling Capactiy' 
                placeholder='Chilling Capacity' 
                validate={[isRequired]}
              />
              <Field
                name="packing_information"
                component={renderField} 
                label='Packing Information' 
                placeholder='Packing information' 
                validate={[isRequired]}
              />
              <Field
                name="vehicle_availibility"
                component={simpleSelect} 
                selectOptions={[{value: true, name:'Yes'}, {value: false, name:'No'} ]} 
                label='Vehicle Availibility' 
                placeholder='Vehicle Availibility' 
                validate={[isRequired]}
              />
              <Field
                name="vehicle_availibility_time"
                component={Timer}
                type="text" 
                label='Time of vehicle availibility' 
                placeholder='Time' 
                validate={[isRequired]}
              />
              <Field
                name="vehicle_info"
                component={renderField} 
                label='Vehicle Info' 
                placeholder='Vehicle info' 
                validate={[isRequired]}
              />
              <Field
                name="hot_weight"
                component={renderField} 
                label='Hot Weight' 
                placeholder='Hot Weight' 
                validate={[isRequired]}
              />
              <Field
                name="hot_weight"
                component={renderField} 
                label='Hot Weight' 
                placeholder='Hot Weight' 
                validate={[isRequired]}
              />
              <Field
                name="mode"
                component={simpleSelect} 
                selectOptions={[ {value:'bulk', name:'Bulk'}, {value:'container', name:'Container'} ]} 
                label='Order Mode' 
                placeholder='Select Order Mode' 
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
                name="carcass_weight"
                component={renderField}
                type="number" 
                label='Carcass Weight' 
                placeholder='Weight of the Carcass' 
                validate={[isRequired]}
              />
              <Field
                name="notes"
                component={renderTextarea}
                type="text" 
                label='Notes' 
                placeholder='Any notes regarding the order' 
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