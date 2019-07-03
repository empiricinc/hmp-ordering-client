import React, { Component } from 'react'
import axios from 'axios';
import config from '../../config'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import './style.scss'


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
    }
    axios.get(`${config.apiUrl}/api/${deptUrls[this.department]}/${this.entityId}`)
    .then((response) => {
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
                  <p className='detail'>{details[name]}</p>
                </div>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}


export default withRouter(connect(store => {
  return {

  }
})(Details))