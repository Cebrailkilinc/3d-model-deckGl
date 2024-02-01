import React from 'react'
import "./middle-bottom-mosque.css"
import { useSelector } from 'react-redux'

const MiddleBottomMosque = () => {
    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
    console.log(mimariBina)
    return (
        <div className='middle-bottom-mosque'>
            <div className='middle-bottom-mosque-footer'>
                <div className='middle-footer-content'>
                    <img width="48" height="48" src="https://img.icons8.com/color-glass/48/mosque.png" alt="mosque" />
                    <h1 className='middle-footer-content-head'>Dini <br></br> Tesislere <br></br> Mesafe</h1>
                </div>
            </div>
            <div className='middle-bottom-mosque-content'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>İbadethane :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_CAMI.toFixed(1) ?? "220"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Mezarlık :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_MEZA.toFixed(1) ?? "299"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Dini Eğitim :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_DINI.toFixed(1) ?? "400"} m</h1>
                    </li>
                
                </ul>
            </div>
        </div>
    )
}

export default MiddleBottomMosque