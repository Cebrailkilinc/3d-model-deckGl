import React from 'react'
import { useSelector } from 'react-redux'
import "./middleLeftBottom.css"

const MiddleLeftBottom = () => {

    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
   
    return (
        <div className='middle-left-bottom'>
            <div className='middle-left-bottom-footer'>
                <div className='middle-footer-content'>
                    <img width="50" height="50" src="https://img.icons8.com/stickers/100/university-building.png" alt="university-building" />
                    <h1 className='middle-footer-content-head'>Kamu <br></br> Binalarına <br></br> Mesafe</h1>
                </div>
            </div>
            <div className='middle-left-bottom-content'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>İdari <br/> Tesisler :</h1>
                        <h1 className='list-item-value'><br/>{mimariBina?.OKLID_IDAR.toFixed(2) ?? "220"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Adliye :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_ADLI.toFixed(2) ?? "299"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Postane :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_POST.toFixed(2) ?? "400"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Banka :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_BANK.toFixed(2) ?? "658"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Güvenlik :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_GUVE.toFixed(2) ?? "3258"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>İtfaiye :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_ITFA.toFixed(2) ?? "300"}m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Ana Okul :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_ANAO.toFixed(2) ?? "25"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Avm :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_AVM.toFixed(2) ?? "152"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Pazar:</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_PAZA.toFixed(2) ?? "211"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Otoban :</h1>
                        <h1 className='list-item-value'>{mimariBina?.OKLID_OTOB.toFixed(2) ?? "220"} m</h1>
                    </li>                
                   
                </ul>
            </div>
        </div>
    )
}

export default MiddleLeftBottom