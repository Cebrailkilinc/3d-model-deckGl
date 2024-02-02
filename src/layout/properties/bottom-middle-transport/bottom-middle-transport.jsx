import React from 'react'
import "./bottomMiddleTransport.css"
import { useSelector } from 'react-redux'

const BottomMiddleTransport = () => {

    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)

    return (
        <div className='middle-bottom-transport'>
            <div className='middle-bottom-transport-footer'>
                <div className='middle-footer-content'>
                    <img width="40" height="40" src="https://img.icons8.com/officel/40/ground-transportation.png" alt="ground-transportation"/>
                    <h1 className='middle-footer-content-head'> Ulaşım <br></br> Noktaları <br></br> Mesafeleri</h1>
                </div>
            </div>
            <div className='middle-bottom-transport-content'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Otobüs :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_OTOB.toFixed(2) ?? "220"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Minibüs :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_MINI.toFixed(2) ?? "299"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Taksi :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_TAXI.toFixed(2) ?? "400"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Otopark:</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_OTOP.toFixed(2) ?? "658"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Anayol:</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_ANAY.toFixed(2) ?? "658"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Cadde:</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_CADD.toFixed(2) ?? "658"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Sokak:</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_SOKA.toFixed(2) ?? "658"} m</h1>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BottomMiddleTransport