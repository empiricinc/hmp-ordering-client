import React, { Component, useState } from 'react'
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import './style.scss'
import moment from 'moment'
import Dropzone from 'react-dropzone';
import {Field} from 'redux-form'

function validURL(str) {
  if(typeof(str) == 'string') {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }else {
    return false
  }
}

export const normalizeCnic = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 5) {
    return onlyNums
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5)}`
  }
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 12)}-${onlyNums.slice(12, 13)}`
}


export const normalizeNumber = (value) => {
  if (!value) return value
  const onlyNums = value.replace(/[^\d]/g, '')
  return onlyNums
}

export const normalizeFloat = (value) => {
  value = value
    .replace(/[^0-9.]/g, '')
  const sections = value.split('.')
  if (sections[0] !== '0' && sections[0] !== '00') {
    sections[0] = sections[0].replace(/^0+/, '')
  } else {
    sections[0] = '0'
  }
  if (sections[1]) {
    return sections[0] + '.' + sections[1].slice(0, 5)
  } else if (value.indexOf('.') !== -1) {
    return sections[0] + '.'
  } else {
    return sections[0]
  }
}
export const cnicFormat = (value) => {
  let st = JSON.stringify(value)
  const onlyNums = st.replace(/[^\d]/g, '')
  if (onlyNums.length <= 5) {
    return onlyNums
  }
  if (onlyNums.length <= 12) {
    return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5)}`
  }
  return `${onlyNums.slice(0, 5)}-${onlyNums.slice(5, 12)}-${onlyNums.slice(12, 13)}`
}
export const disabledField = ({ type, label, input, meta: { touched, error } }) => {
  return (
    <div className='inputform'> <input className='form-control input-box' {...input} type={type} placeholder={label} readOnly="readonly" ></input></div>)

}
export const renderField = ({ type, label, input, min, placeholder, max, meta: { touched, error } }) => {

  const dateProps = type == 'date' ? { min, max } : null
  if(type == 'date') {
    delete input.value;
    dateProps.value = moment(input.value).format('YYYY-MM-DD')
  }
  // console.log('dateValue',input.value)
  return (<div className='inputform space-4'>
    <h6 className='inputLabel text-left'>{label}</h6>
    <input className='selectFormInput' {...dateProps} {...input} type={type} placeholder={placeholder} autoComplete='off' ></input>
    {touched && error &&
      <p className='validation-error' >{error}</p>}
  </div>
  )
}

export const renderTextarea = ({ type, label, input, min, placeholder, max, meta: { touched, error } }) => {

  const dateProps = type == 'date' ? { min, max } : null

  return (<div className='inputform space-4'>
    <h6 className='inputLabel text-left'>{label}</h6>
    <textarea rows={5} className='selectFormInput' {...dateProps} {...input} type={type} placeholder={placeholder} autoComplete='off' ></textarea>
    {touched && error &&
      <p className='validation-error' >{error}</p>}
  </div>
  )
}

export const simpleSelect = ({ type, label, input, min, selectOptions = [], placeholder, max, meta: { touched, error } }) => {

  const dateProps = type == 'date' ? { min, max } : null;
  return (<div className='inputform space-4'>
    <h6 className='inputLabel text-left'>{label}</h6>
    <select value={input.value} onChange={(e) => {input.onChange(e.target.value)}}  className='selectFormInput'>
      <option value={null}> {placeholder} </option>
      {selectOptions.map((item) => {
          return <option value={item.value}> {item.name} </option>
      })}
    </select>
    {touched && error &&
      <p className='validation-error' >{error}</p>}
  </div>
  )
}

export const renderDropzoneInput = (field) => {
  const files = field.input.value;
  const label = field.label;
  return (
    <React.Fragment>
      <h6 className='inputLabel text-left'>{label}</h6>
      <div className='dropzoneInput'>
        <Dropzone
          name={field.name}
          onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        >
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} multiple={false} />
              <p className='no-margin'>Drop or Select file</p>
            </div>
          )}
        </Dropzone>
      </div>
      <div className='dropzoneFileList'>
        {field.meta.touched &&
          field.meta.error &&
          <span className="error">{field.meta.error}</span>}
        {files && Array.isArray(files) && (
          <ul>
            { files.map((file, i) => <li key={i}>{file.name}</li>) }
            <p className='text-center' onClick={() => {field.input.onChange(null)}}>remove files</p>
          </ul>
        )}
        </div>
    </React.Fragment>
  );
}

export class FileInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valueProvided: false,
    }
  }
  componentDidMount() {
    if(validURL(this.props.input.value)) {
      this.setState({
        valueProvided: true,
      })
    }
  }
  fileToBase64 (filesList) {
    var base64ImgArray = [];
    for (var i = 0; i < filesList.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(filesList[i]);
      reader.onload = () => {
        console.log(reader.result);
        base64ImgArray.push(reader.result);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
    console.log(base64ImgArray);
    this.props.input.onChange(base64ImgArray)
  }
  render() {
    const { multi, label } = this.props;
    const { valueProvided } = this.state;
    return (
      <div>
        <h6 className='inputLabel text-left'>{label}</h6>
        <div className='dropzoneInput'>
          {
            valueProvided ?
              <div>
                <React.Fragment>
                  <a style={{margin: '10px'}} href={this.props.input.value} target="_blank">Download</a>
                  <a onClick={(e) => {e.preventDefault(); this.setState({valueProvided:false})}} style={{margin: '10px', color:'#ef5350'}}>Upload another</a>
                </React.Fragment>
              </div> :
             <input multiple={multi} onChange ={ (value) => { this.fileToBase64(value.target.files) }} type='file'/>
          }
        </div>
      </div>
    )
  }
} 

export const renderAnimals = ({ fields }) => {
  return (
    <div>
      <h3 className='space-4'>Animals Informatiom</h3>
      {fields.map((animal, index) => (
        <div className='productWrapper'>
          <h6 className='inputLabel text-left'>Animal Type</h6>
          <Field name={`${animal}.type`} key={index} component={renderField} />
          <h6 className='inputLabel text-left'>Animal Tag</h6>
          <Field
            name={`${animal}.tag`}
            key={`${index} + a`}
            component={renderField}
          />
          <h6 className='inputLabel text-left'>Animal Weight</h6>
          <Field
            name={`${animal}.weight`}
            key={`${index} + b`}
            component={renderField}
          />
        </div>
      ))}
      <button className='addButton' type="button" onClick={() => fields.push()}>
        Add more
      </button>
      {fields.length ? <button  className='removeButton' type="button" onClick={() => fields.pop()}>
        Remove Last
      </button> : null}
    </div>
  );
};

export const renderOrderType = ({ fields }) => {
  return (
    <div>
      <h4 className='bold text-left'>Order Details</h4>
      {fields.map((product, index) => (
        <div className='productWrapper'>
          <h6 className='inputLabel text-left'>Product Type</h6>
          <Field 
          name={`${product}.item`}
          key={index}
          placeholder='Select Product Type' 
          component={simpleSelect}
          selectOptions={[{value:'mutton', name:'Mutton'}, {value:'beef', name:'Beef'}, {value:'chicken', name:'chicken'} ]} 
          />
          <h6 className='inputLabel text-left'>Carcass Weight (in KGs)</h6>
          <Field
            name={`${product}.carcass_weight`}
            key={`${index} + b`}
            component={renderField}
          />
          {/* <hr/> */}
        {/* <hr/> */}
        </div>
      ))}
      <button className='space-4 addButton' type="button" onClick={() => fields.push()}>
        Add product
      </button>
      {fields.length ? <button type="button" className='space-4 removeButton' onClick={() => fields.pop()}>
        Remove Last
      </button> : null}
    </div>
  );
};

export const Timer = (props) => {
  const time = moment().format('LT')
  console.log(time);
  const [isTime, setTime] = useState(props.input.value || time)
  return (<div className='space-4'>
    <h6 className='inputLabel text-left'>{props.label}</h6>
    <TimePicker
      theme={'classic'}
      colorPalette="light"
      time={isTime}
      // theme="material"
      onTimeChange={
        (ev)=>{
          // console.log(ev);
          // console.log('from moment',setTime(moment(`${ev.hour}:${ev.minute} ${ev.meridiem}`).format('LT'))); 
          let time = ev.hour+':'+ev.minute + ' ' + ev.meridiem;
          setTime(time)
          props.input.onChange(time)
          }
        }
      timeMode="12"
      timezone="Asia/Karachi"
    />
  </div>
  )

}

export const isRequired = value => value ? undefined : 'This Field is Required'
