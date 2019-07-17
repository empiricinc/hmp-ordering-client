import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm, FieldArray } from 'redux-form'
import config from "../../config";
import axios from "axios";

// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, simpleSelect, Timer, renderTextarea, FileInput, renderAnimals } from '../../components/ReduxFormComponents';


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
                label='Name' 
                placeholder='Name' 
                validate={[isRequired]}
              />
              <Field
                name="vehicle"
                component={renderField}
                type="text" 
                label='Vehicle No.' 
                placeholder='Vehicle No.' 
                validate={[isRequired]}
              />
              <Field
                name="mandi"
                component={renderField}
                type="text" 
                label='Name of Mandi'
                placeholder='Name of Mandi'  
                validate={[isRequired]}
              />
              <Field
                name="procured_by"
                component={renderField}
                type="text" 
                label='Procured By'
                placeholder='Procured By'  
                validate={[isRequired]}
              />
              <Field
                name="grn"
                component={renderField}
                type="text" 
                label='GRN'
                placeholder='GRN'  
              />
              <Field
                name="total_animals"
                component={renderField}
                type="text" 
                label='Total Animals'
                placeholder='Total No. of Animals'  
              />
              <FieldArray
                name={'animals'}
                component={renderAnimals}
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
  form: 'Bookingform',
})(Form)