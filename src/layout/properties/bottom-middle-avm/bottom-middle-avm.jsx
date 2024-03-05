import React from 'react'
import "./bottom-middle-avm.css"
import { useSelector } from 'react-redux'

const BottomMiddleAvm = () => {
  const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
  return (
    <div className='middle-right-bottom-avm'>
      <div className='middle-right-bottom-avm-footer'>
        <div className='middle-footer-right-content-avm'>
          <img width="50" height="50" src="https://img.icons8.com/arcade/64/fast-cart.png" alt="fast-cart" />
          <h1 className='middle-footer-content-head'>Alışveriş Alanlarına <br />  Mesafe</h1>
        </div>
      </div>
      <div className='middle-right-bottom-content-avm'>
        <ul className='content-list'>
          <li  className='content-list-item' >
            <h1 className='list-item-head'>Alışveriş Merkezi :</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_AVM.toFixed(2) ?? "220"} m</h1>
          </li>
          <li  className='content-list-item' >
            <h1 className='list-item-head'>Çarşı Merkezi:</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_CARS.toFixed(2) ?? "299"} m</h1>
          </li>
          <li  className='content-list-item' >
            <h1 className='list-item-head'>Market :</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_MARK.toFixed(2) ?? "400"} m</h1>
          </li>
          <li  className='content-list-item' >
            <h1 className='list-item-head'>Pazar Alanı :</h1>
            <h1 className='list-item-value'>{mimariBina?.OKLID_PAZA.toFixed(2) ?? "400"} m</h1>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BottomMiddleAvm