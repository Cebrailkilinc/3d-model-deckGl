import React from 'react'
import "./middleBottomEducation.css"
import { useSelector } from 'react-redux'
const MiddleBottomEducation = () => {

  const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)

  return (
    <div className='middle-bottom-education'>
      <div className='middle-bottom-education-footer'>
        <div className='middle-footer-content'>
          <img width="48" height="48" src="https://img.icons8.com/color-glass/48/education.png" alt="education" />
          <h1 className='middle-footer-content-head'>Eğitim <br></br> Tesislerine <br></br> Mesafe</h1>
        </div>
      </div>
      <div className='middle-bottom-education-content'>
        <ul className='content-list'>
          <li className='content-list-item'>
            <h1 className='list-item-head'>Anaokul :</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_ANAO.toFixed(1) ?? "220"} m</h1>
          </li>
          <li className='content-list-item'>
            <h1 className='list-item-head'>Ortaokul :</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_ILKO.toFixed(1) ?? "299"} m</h1>
          </li>
          <li className='content-list-item'>
            <h1 className='list-item-head'>Lise :</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_LISE.toFixed(1) ?? "400"} m</h1>
          </li>
          <li className='content-list-item'>
            <h1 className='list-item-head'>Üniversite :</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_UNIV.toFixed(1) ?? "658"} m</h1>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default MiddleBottomEducation