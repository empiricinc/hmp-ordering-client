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
        <div className='text-left'>
        <h3 className='pl-3 bold'>Add Quarantine Resources</h3>
        <p className='pl-3 space-4'>Add related resources and submit</p>
        </div>
				<Container>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-fixed-submit'>
              <Field
                name="date_of_quarantine"
                component={renderField}
                type="date" 
                label='Date of Quarantine' 
                placeholder='Date of Quarantine' 
                validate={[isRequired]}
              />
              <Field
                name="proof_doc"
                component={FileInput}
                type="file" 
                label='Quarantine Proof Documents' 
                placeholder='Quarantine Proof Documents' 
                validate={[isRequired]}
              />
              <Field
                name="department"
                component={simpleSelect}
                type="text" 
                label='Quarantine Department Type'
                selectOptions={[{value:'government', name:'Government'}, {value:'private', name:'Private'}]} 
                placeholder='Quarantine Department Type'  
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