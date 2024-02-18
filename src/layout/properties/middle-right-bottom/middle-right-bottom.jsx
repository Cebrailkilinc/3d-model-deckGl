import React from 'react'
import { useSelector } from 'react-redux'
import "./middleRightBottom.css"

const MiddleRightBottom = () => {

    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
  
    return (
        <div className='middle-right-bottom'>
            <div className='middle-right-bottom-footer'>
                <div className='middle-footer-right-content'>
                    <img width="50" height="50" src="https://img.icons8.com/external-filled-outline-perfect-kalash/64/external-hospital-healthcare-and-medicine-filled-outline-perfect-kalash.png" alt="external-hospital-healthcare-and-medicine-filled-outline-perfect-kalash" />
                    <h1 className='middle-footer-content-head'>Sağlık Tesislerine  Mesafe</h1>
                </div>
            </div>
            <div className='middle-right-bottom-content'>
                <ul className='middle-right-bottom-content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Acil :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_ACIL.toFixed(2) ?? "220"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Eczane :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_ECZA.toFixed(2) ?? "299"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Hastane :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_HAST.toFixed(2) ?? "400"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Asm :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_SAGL.toFixed(2) ?? "658"} m</h1>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MiddleRightBottom