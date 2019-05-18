import React, { Component, useState } from 'react'
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import './style.scss'
import moment from 'moment'


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
    <select  onChange={(e) => {input.onChange(e.target.value)}}  className='selectFormInput'>
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

export const Timer = (props) => {
  const time = moment().format('LT')
  const [isTime, setTime] = useState(time)
  props.input.onChange(isTime)  
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
          setTime(time)}
        }
      timeMode="12"
      timezone="Asia/Karachi"
    />
  </div>
  )

}

export const isRequired = value => value ? undefined : 'This Field is Required'
