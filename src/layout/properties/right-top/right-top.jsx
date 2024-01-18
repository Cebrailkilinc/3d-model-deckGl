import React from 'react'
import "./righttop.css"
import { useSelector } from 'react-redux'
const RightTop = () => {

    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
   
    return (
        <div className='right-top'>
            <div className='right-top-footer'>
                <img width="80" height="80" src="https://img.icons8.com/bubbles/100/inland.png" alt="inland" />
                <h1>İmar Bilgisi</h1>
            </div>
            <div className='right-top-content'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Ada No :</h1>
                        <h1 className='list-item-value'>{parsel?.adaNo ?? "20"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Parsel No :</h1>
                        <h1 className='list-item-value'>{parsel?.parselNo ?? "20"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Taks :</h1>
                        <h1 className='list-item-value'>{parsel?.TAKS ?? "320"} m²</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Kaks :</h1>
                        <h1 className='list-item-value'>{parsel?.KAKS ?? "2.0"} m</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Alan :</h1>
                        <h1 className='list-item-value'>{parsel?.Parsel_Ala ?? "282.5"} m²</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Mülkiyet :</h1>
                        <h1 className='list-item-value'>{parsel?.Mulkiyet_D ?? "Kat Mülkiyeti"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Yapı Nizamı :</h1>
                        <h1 className='list-item-value'>{parsel?.YAPI_NIZ ?? "20"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Eğim :</h1>
                        <h1 className='list-item-value'>{parsel?.EGIM ?? "9"} %</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Eğim :</h1>
                        <h1 className='list-item-value'>{parsel?.PARSEL_KUL ?? "Konut"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Isıtma Türü :</h1>
                        <h1 className='list-item-value'>{parsel?.IsıtmaSis ?? "Merkezi sistem"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Isı Yalıtımı:</h1>
                        <h1 className='list-item-value'>{parsel?.IsıYalıt ?? "Yok"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Çocuk Oyun Alanı :</h1>
                        <h1 className='list-item-value'>{parsel?.CocukOyunA ?? "Var"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Asansör :</h1>
                        <h1 className='list-item-value'>{parsel?.AsansorMev ?? "Var"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Asansör :</h1>
                        <h1 className='list-item-value'>{parsel?.HavuzMev ?? "Var"}</h1>
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default RightTop