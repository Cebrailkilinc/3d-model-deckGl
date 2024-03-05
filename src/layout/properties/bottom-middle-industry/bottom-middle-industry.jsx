import React from 'react'
import "./bottom-middle-industry.css"
import { useSelector } from 'react-redux'

const BottomMiddleIndustry = () => {
    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
    return (
        <div className='middle-right-bottom-industry'>
            <div className='middle-right-bottom-industry-footer'>
                <div className='middle-footer-right-content-industry'>
                <img width="50" height="50" src="https://img.icons8.com/papercut/60/manufacturing.png" alt="manufacturing"/>
                    <h1 className='middle-footer-content-head'>Sanayi Alanlarına  Mesafe</h1>
                </div>
            </div>
            <div className='middle-right-bottom-content-industry'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Akaryakıt <br/> istasyonu :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_AKAR.toFixed(2) ?? "220"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Endüstri :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_SAHI.toFixed(2) ?? "299"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Arıtma :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_ARIT.toFixed(2) ?? "400"} m</h1>
                    </li>                
                </ul>
            </div>
        </div>
    )
}

export default BottomMiddleIndustry