import React from 'react'
import "./middle-bottom-interest.css"
import { useSelector } from 'react-redux'

const MiddleBottomInterest = () => {
    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
    return (
        <div className='middle-right-bottom'>
            <div className='middle-right-bottom-footer'>
                <div className='middle-footer-right-content'>
                <img width="50" height="50" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-interest-dating-app-flaticons-lineal-color-flat-icons-2.png" alt="external-interest-dating-app-flaticons-lineal-color-flat-icons-2"/>
                    <h1 className='middle-footer-content-head'>İlgi Alanlarına  Mesafe</h1>
                </div>
            </div>
            <div className='middle-right-bottom-content'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Kültürel Tesis :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_KULT.toFixed(2) ?? "220"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Sahil:</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_SAHI.toFixed(2) ?? "299"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Yeşil Alan :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_PARK.toFixed(2) ?? "400"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Spor Tesisi :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_SPOR.toFixed(2) ?? "658"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Restoran :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_REST.toFixed(2) ?? "658"} m</h1>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default MiddleBottomInterest