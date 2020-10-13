import React, { useEffect } from 'react'
import Axios from 'axios'
import { notification } from 'antd'
import Dashboard from '../components/Dashboard'

const Index = (props) => {
  useEffect(() => {
    Axios({
      method: 'post',
      url: "/api/student/verifyToken",
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    }).then(res => {
      if(!res.data.auth) {
        notification["error"]({
          message: "Please Login to continue",
          description: "You have been logged out due to session timeout."
        });
        props.history.push("/login")
      } else {
      //  nothing to do
      }
    }).catch(err => {
      if(!err.response.auth) {
        notification["error"]({
          message: "Please Login to continue",
          description: "You have been logged out due to session timeout."
        });
        props.history.push("/login")
      }
    })
  }, [])
  return (
    <Dashboard {...props} />
  )
}

export default Index
