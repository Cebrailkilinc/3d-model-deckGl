import React from 'react'
import "./leftbottom.css"
import { useSelector } from 'react-redux'

const LeftBottom = () => {
    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)

    return (
        <div className='left-bottom'>
            <div className='left-bottom-footer'>
                <div className='left-footer-bagimsiz-content'>
                    <img width="50" height="50" src="https://img.icons8.com/dusk/64/floor-plan.png" alt="floor-plan" />
                    <h1>Bağımsız  Bölüm</h1>
                </div>
            </div>
            <div className='left-bottom-content'>
                <ul className='content-list'>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Alan :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.alan ?? "220" } m²</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Daire No :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.BB_No ?? "2"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Balkon Sayısı :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.Balkon ?? "0"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Banyo Sayısı :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.Banyo ?? "2"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Kat :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.BulunduguK ?? "3"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Manzara :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.MANZARA ?? "Deniz"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Oda Sayısı :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.Oda ?? "5"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Oda Planlama :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.Oda_Tipi ?? "3+1"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Block :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.blockName ?? "A"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Cephe :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.directionT ?? "Kuzey"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Isı Yalıtımı:</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.IsıYalıt ?? "Yok"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Çocuk Oyun Alanı :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.CocukOyunA ?? "Var"}</h1>
                    </li>
                    <li className='content-list-item'>
                        <h1 className='list-item-head'>Asansör :</h1>
                        <h1 className='list-item-value'>{bagimsizBolum?.AsansorMev ?? "Var"}</h1>
                    </li>                   
                </ul>
            </div>
        </div>
    )
}

export default LeftBottom