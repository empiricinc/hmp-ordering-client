import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'
// import {renderField} from '../../components/ReduxFormComponents'

import './style.scss';
import { renderField, isRequired, simpleSelect, Timer, renderTextarea, renderDropzoneInput } from '../../components/ReduxFormComponents';


class Form extends Component {
  // handleSubmit = (model) => {
  //   console.log(model)
  //   let images = [];
  //   model.file.forEach((file) => {

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //         const fileAsBase64 = reader.result.substr(reader.result.indexOf(",") + 1);
  //         images.push(fileAsBase64);
  //     };

  //     reader.onabort = () => console.log("file reading was aborted");
  //     reader.onerror = () => console.log("file reading has failed");

  //     reader.readAsDataURL(file);
  // });
  // console.log(images);
  // }
	render() {
		return (
			<div className='homeContainer' id="home">
				<Container>
          <form onSubmit={this.props.handleSubmit}>
            <div className='form-fixed-submit'>
              <h5>Flight Information</h5>
              <Field
                name="firstname"
                component={renderField}
                type="text" 
                label='First Name' 
                placeholder='Airline' 
                validate={[isRequired]}
              />
              <Field
                name="lastname"
                component={renderField}
                type="text" 
                label='Last Name' 
                placeholder='Last Name' 
                validate={[isRequired]}
              />
              <Field
                name="email"
                component={renderField}
                type="email" 
                label='Email' 
                placeholder='Email' 
                validate={[isRequired]}
              />
              <Field
                name="password"
                component={renderField}
                type="password" 
                label='Password' 
                placeholder='Password' 
                validate={[isRequired]}
              />
              <Field
                name="password"
                component={renderField}
                type="password" 
                label='Password' 
                placeholder='Password' 
                validate={[isRequired]}
              />
              <Field
                name="role"
                component={simpleSelect}
                type="text" 
                label='Role'
                selectOptions={[{value:'admin', name:'Admin'}, {value:'User', name:'user'}]} 
                placeholder='Role'  
                validate={[isRequired]}
              />
              <Field
                name="department"
                component={simpleSelect}
                type="text" 
                label='Role'
                selectOptions={[{value:'documnetation', name:'Documnetation'}, {value:'Quarantine', name:'quarantine'}]} 
                placeholder='Role'  
                validate={[isRequired]}
              />
              <Field
                name="notes"
                component={renderField}
                type="text" 
                label='Airline' 
                placeholder='Airline' 
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