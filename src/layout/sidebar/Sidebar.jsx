import React from 'react'
import "../../styles/sidebar.css"
import Uploads from '../../components/Uploads'
import { Checkbox } from 'antd';

const Sidebar = ({ count }) => {
 

  return (
    <div className='sidebar-container' >
       
      {
        count && count.map((item, i) => {
          return (
            <div className='layer' >
              <Checkbox />               
              <h1>Layer - {i}</h1>              
            </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar