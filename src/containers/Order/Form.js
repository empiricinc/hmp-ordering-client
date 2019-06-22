import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
import axios from 'axios'
import config from '../../config';
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, simpleSelect, Timer, renderTextarea } from '../../components/ReduxFormComponents';


class Form extends Component {
	render() {
		return (
			<div className='homeContainer' id="home">
				<Container>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-fixed-submit'>
              <Field
                name="product_type"
                component={simpleSelect} 
                selectOptions={[{value:'mutton', name:'Mutton'}, {value:'beef', name:'Beef'}, {value:'chicken', name:'chicken'} ]} 
                label='Product Type' 
                placeholder='Select Product Type' 
                validate={[isRequired]}
              />
              <Field
                name="date_of_delivery"
                component={renderField}
                type="date" 
                label='Date of delivery' 
                placeholder='Date of Delivery' 
                validate={[isRequired]}
              />

              <Field
                name="mode_of_delivery"
                component={simpleSelect} 
                selectOptions={[{value:'ship', name:'Ship'}, {value:'airline', name:'Airlines'}, {value:'by_road', name:'By Road'} ]} 
                label='Mode of Delivery' 
                placeholder='Select Delivery Mode' 
                validate={[isRequired]}
              />
              <Field
                name="type"
                component={simpleSelect} 
                selectOptions={[{value:'KGs', name:'KGs'}, {value:'quarters', name:'Quarters'}, {value:'legs', name:'Legs'}, {value:'chest', name:'Chest'}, {value:'wings', name:'Wings'}, ]} 
                label='Order Type' 
                placeholder='Select Order Type' 
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
                name="flight_date"
                component={renderField}
                type="date" 
                label='Flight Date' 
                placeholder='Date of Flight' 
                validate={[isRequired]}
              />
              {/* <Field
                name="flight_time"
                component={Timer}
                type="text" 
                label='Flight Time' 
                placeholder='Time of Flight' 
                validate={[isRequired]}
              /> */}
              <Field
                name="carcass_weight"
                component={renderField}
                type="number" 
                label='Carcass Weight (KGs)' 
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