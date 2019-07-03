import React, { Component, useState } from 'react'
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import './style.scss'
import moment from 'moment'
import Dropzone from 'react-dropzone';


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
  }
  fileToBase64 (filesList) {
    /// logic
    // console.log(value.target.files);
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
    // var base64ImgArray = filesList.map((file, index) => {
    // })

    console.log(base64ImgArray);
    this.props.input.onChange(base64ImgArray)

  }
  render() {
    const { multi, label } = this.props;
    return (
      <div>
        <h6 className='inputLabel text-left'>{label}</h6>
        <div className='dropzoneInput'>
          <input multiple={multi} onChange ={ (value) => { this.fileToBase64(value.target.files) }} type='file'/>
        </div>
      </div>
    )
  }
} 

export const Timer = (props) => {
  const time = moment().format('LT')
  const [isTime, setTime] = useState(new Date(props.input.value))
  const fullDate = new Date();

  // if(props.input.value) {
  //   // moment(props.input.value).format()
  //   let newDate = new Date(props.input.value);
  //   setTime(newDate);
  // }
// fullDate = Tue Dec 12 2017 11:18:30 GMT+0530 (IST) {}
  // const time = '01.00 AM';
  // const d = moment(fullDate).format('L'); // d = "12/12/2017"
  // const date = moment(d +' '+ isTime).format();
  // console.log(date);
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
          console.log(moment(moment(fullDate).format('L') +' '+ time).format())
          props.input.onChange(moment(moment(fullDate).format('L') +' '+ time).format())  
        }
        }
      timeMode="12"
      timezone="Asia/Karachi"
    />
  </div>
  )

}

export const isRequired = value => value ? undefined : 'This Field is Required'
