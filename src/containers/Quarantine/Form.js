import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, simpleSelect, Timer, renderTextarea, FileInput } from '../../components/ReduxFormComponents';


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
              <Field
                name="date"
                component={renderField}
                type="date" 
                label='Date of delivery' 
                placeholder='Date of Delivery' 
                validate={[isRequired]}
              />
              <Field
                name="quarantine_proof_documents"
                component={FileInput}
                type="file" 
                label='Quarantine Proof Documents' 
                placeholder='Quarantine Proof Documents' 
                validate={[isRequired]}
              />
              <Field
                name="quarantine_department_type"
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