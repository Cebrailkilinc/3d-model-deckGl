import React from 'react'
import "./lefttop.css";

import { useSelector } from "react-redux";

const data = [
    'Racing car ',
    'Japanese princess',
    'Australianh.',
    'Man charged .',
    'Los Angeles',
]
const LeftTop = () => {
    const { mimariBina, bagimsizBolum } = useSelector(state => state.properties)
 
    return (
        <div className='left-top'>
            <div className='left-top-footer'>
                <img width="80" height="80" src="https://img.icons8.com/plasticine/100/building.png" alt="building" />
                <h1>Bina Özellikleri</h1>

            </div>
            <div className='left-top-content'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Bina Yaşı :</h1>
                        <h1 className='list-item-value'>{mimariBina?.BinaYas202 ?? "20"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Kat Adedi :</h1>
                        <h1 className='list-item-value'>{mimariBina?.Kat_Adet ?? "20"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Çatı Alanı :</h1>
                        <h1 className='list-item-value'>{mimariBina?.CatiAln ?? "320"} m²</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Yapı Yüksekliği  :</h1>
                        <h1 className='list-item-value'>{mimariBina?.yapıYuk ?? "20"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Yapı Tarihi :</h1>
                        <h1 className='list-item-value'>{mimariBina?.yapıDate ?? "12.12.2022"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Parsel No :</h1>
                        <h1 className='list-item-value'>{mimariBina?.parcelNo ?? "101"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Block No :</h1>
                        <h1 className='list-item-value'>{mimariBina?.blockNumbe ?? "20"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Daire Sayısı :</h1>
                        <h1 className='list-item-value'>{mimariBina?.bagımsız ?? "9"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Isıtma Türü :</h1>
                        <h1 className='list-item-value'>{mimariBina?.IsıtmaSis ?? "Merkezi sistem"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Isı Yalıtımı:</h1>
                        <h1 className='list-item-value'>{mimariBina?.IsıYalıt ?? "Yok"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Çocuk Oyun Alanı :</h1>
                        <h1 className='list-item-value'>{mimariBina?.CocukOyunA ?? "Var"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Asansör :</h1>
                        <h1 className='list-item-value'>{mimariBina?.AsansorMev ?? "Var"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Asansör :</h1>
                        <h1 className='list-item-value'>{mimariBina?.HavuzMev ?? "Var"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Site İçi :</h1>
                        <h1 className='list-item-value'>{mimariBina?.Siteicinde ?? "Hayır"}</h1>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftTop