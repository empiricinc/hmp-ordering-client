import React, { Component } from 'react'
import axios from 'axios';
import config from '../../config'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import './style.scss'

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

class Details extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        details: {},
    }
  }
  
  componentDidMount() {
    console.log(this.props);
    const {match} = this.props;
		this.entityId = match.params.id;
    this.department = match.params.department;
    const deptUrls = {
      production: 'production_dept',
      quarantine: 'quarantine_dept',
      documentation: 'doc_team',
      stock: 'stock',
    }
    axios.get(`${config.apiUrl}/api/${deptUrls[this.department]}/${this.entityId}`)
    .then((response) => {
      delete response.data.__v
      delete response.data._id
      delete response.data.updatedAt
      delete response.data.createdAt
      response.data.vehicle_availability = response.data.vehicle_availability === true ? 'Yes' : 'NO' 
      this.setState({details: response.data})
    })
  }
  
  render() {
    const {details} = this.state;
    return (
      <div className='col-sm-12 productionDetailsWrapper'>
        {
          Object.keys(details).map((name, index) => {
            return (
               typeof(details[name]) != 'object' && <React.Fragment key={index}>
                <div>
                  <h5 className='heading text-capitalize'>{name.split('_').join(' ')}</h5>
                </div>
                <div>
                  <p className='detail'>{details[name] && validURL(details[name]) ? <a target="_blank" href={details[name]}> Download File</a> : details[name] }</p>
                </div>
              </React.Fragment>
            )
          })
        }
        {
          this.department && this.department == 'stock' ? 
          details.animals_ref && details.animals_ref.length && details.animals_ref.map((item, index) => {
            // <div></div>
            console.log(item)
            return Object.keys(item).map((entry, index) => {
              return <div>
                <div>
                  <h6 className='heading text-capitalize'>{entry.split('_').join(' ')}</h6>
                </div>
                <div>
                  <p className='detail'>{item[entry]}</p>
                </div>
              </div>
            })
          })
          : null
        }
      </div>
    )
  }
}


export default withRouter(connect(store => {
  return {

  }
})(Details))