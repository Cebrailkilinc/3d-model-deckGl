import React from 'react'
import "../../styles/sidebar.css"
import Uploads from '../../components/Uploads'
import { Checkbox } from 'antd';
import suncalc from 'suncalc';

const Sidebar = ({ count }) => {

  const date = new Date(); // İlgili tarihi ve saat bilgisi
  
  const sunTimes = suncalc.getTimes(date, 37, 37);


  return (
    <div className='sidebar-container' >
      <h1 className='sidebar-container-header'  >Table Of Content</h1>
      {
        count && count.map((item, i) => {
          return (
            <div className='layer' key={i} >
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