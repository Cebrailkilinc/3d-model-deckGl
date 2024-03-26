import React, { useState, useEffect } from 'react';
import headerImg from "../../../assets/pdf-img/forHeader.png";
import { useSelector } from 'react-redux';
import "./writer.css"
import GaugeChart from 'react-gauge-chart';
import axios from 'axios';


const PdfWriter = ({
    mimariBina,
    parsel,
    bagimsizBolum
}) => {


    const allPointArray = [
        { key: "PUANBINA", value: bagimsizBolum && bagimsizBolum.PUANBINA ? bagimsizBolum.PUANBINA : "20" },
        { key: "PUAN_KENTF", value: bagimsizBolum && bagimsizBolum.PUAN_KENTF ? bagimsizBolum.PUAN_KENTF : "20" },
        { key: "PuanPARSEL", value: bagimsizBolum && bagimsizBolum.PuanPARSEL ? bagimsizBolum.PuanPARSEL : "20" },
        { key: "PUAN_ULASI", value: bagimsizBolum && bagimsizBolum.PUAN_ULASI ? bagimsizBolum.PUAN_ULASI : "20" },
        { key: "PuanMahall", value: bagimsizBolum && bagimsizBolum.PuanMahall ? bagimsizBolum.PuanMahall : "20" }
    ];

    // useEffect(()=>{
    //     axios.get(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4241,37.78,14.25,0,0/600x400?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`).then(res => console.log(res.data))

    // },[])

    console.log("bagimsizBolum.geometry.coordinates[0][0][0]")

    return (
        <div className='background' style={{ padding: "10px" }} >
            <div className='chart-container ' >
                <h1>Puan Tablosu</h1>
                <div className='chart-container-content '>
                    {
                        allPointArray.map((item, i) => {
                            return <GaugeChart key={i} id="gauge-chart2"
                                nrOfLevels={20}
                                percent={item.value / 100}
                                textColor='black'

                            />
                        })
                    }
                </div>
            </div>

            <div >
                <div style={{ position: 'relative',  display: 'inline-block' }}>
                    <img style={{textAlign:"center"}} src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/35,36,15.25,0,0/850x300?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`} alt="Map Image" />
                    <svg style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="red" strokeWidth="2" />
                    </svg>
                </div>
            </div>



            <div className='content-writer' >
                <div className='content-table-writer'>
                    <div className='content-table-writer-body-head'>
                        <div className='property-header' >
                            <img width="80" height="80" src="https://img.icons8.com/plasticine/100/building.png" alt="building" />
                            <h1 className='property-header-text'>Bina Özellikleri</h1>
                        </div>

                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Bina Yaşı :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.BinaYas202 ?? "20"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Kat Adedi :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.Kat_Adet ?? "20"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Isıtma Türü :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.IsıtmaSis ?? "Merkezi sistem"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Isı Yalıtımı:</td>
                                    <td className='list-item-value-writer'>{mimariBina?.IsıYalıt ?? "Yok"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Site İçi :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.Siteicinde ?? "Hayır"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Asansör :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.AsansorMev ?? "Var"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Havuz :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.HavuzMev ?? "Var"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Otopark :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.CatiAln ?? "320"} m²</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Çatı Alanı :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_OTOP ?? "320"} m²</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Yapı Yüksekliği  :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.yapıYuk ?? "20"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Daire Sayısı :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.bagımsız ?? "9"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Çocuk Oyun Alanı :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.CocukOyunA ?? "Var"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='content-table-writer-body-head'>
                        <div className='property-header' >
                            <img width="80" height="80" src="https://img.icons8.com/bubbles/100/inland.png" alt="inland" />
                            <h1 className='property-header-text'>İmar özellikleri</h1>
                        </div>
                        <h1></h1>
                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Ada No :</td>
                                    <td className='list-item-value-writer'>{parsel?.adaNo ?? "20"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Parsel No :</td>
                                    <td className='list-item-value-writer'>{parsel?.parselNo ?? "20"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Taks :</td>
                                    <td className='list-item-value-writer'>{parsel?.TAKS ?? "320"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Kaks :</td>
                                    <td className='list-item-value-writer'>{parsel?.KAKS ?? "2.0"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Alan :</td>
                                    <td className='list-item-value-writer'>{parsel?.Parsel_Ala ?? "282.5"} m²</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Mülkiyet :</td>
                                    <td className='list-item-value-writer'>{parsel?.Mulkiyet_D ?? "Kat Mülkiyeti"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Parsel Konumu :</td>
                                    <td className='list-item-value-writer'>{parsel?.PARSEL_KON}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Cephe Sayısı:</td>
                                    <td className='list-item-value-writer'>{parsel?.ON_CEPHE_S}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Ön Cephe Uzunluğu:</td>
                                    <td className='list-item-value-writer'>{parsel?.ON_CEPHE_U}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Yan Cephe Uzunluğu:</td>
                                    <td className='list-item-value-writer'>{parsel?.ON_CEPHE_Y}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Yapı Nizamı :</td>
                                    <td className='list-item-value-writer'>{parsel?.YAPI_NIZ === "A" ? "Ayrık" : "Bitişik"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Eğim :</td>
                                    <td className='list-item-value-writer'>{parsel?.EGIM ?? "9"} %</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Kullanım:</td>
                                    <td className='list-item-value-writer'>{parsel?.PARSEL_KUL ?? "Konut"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Yol:</td>
                                    <td className='list-item-value-writer'>{parsel?.YOL ?? "Konut"}m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='content-table-writer'>
                    <div className='content-table-writer-body-head'>
                        <div className='property-header' >
                            <img width="50" height="50" src="https://img.icons8.com/papercut/60/manufacturing.png" alt="manufacturing" />
                            <h1 className='property-header-text'>Sanayi Alanlarına Mesafe</h1>
                        </div>
                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Akaryakıt İstasyonu :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_AKAR.toFixed(2) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Endüstri :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_SAHI.toFixed(2) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Arıtma :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ARIT.toFixed(2) ?? "400"} m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='content-table-writer-body-head'>
                        <div className='property-header' >
                            <img width="48" height="48" src="https://img.icons8.com/color-glass/48/education.png" alt="education" />
                            <h1 className='property-header-text'>Eğitim Tesislerine Mesafe</h1>
                        </div>
                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Anaokul :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ANAO.toFixed(1) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Ortaokul :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ILKO.toFixed(1) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Lise :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_LISE.toFixed(1) ?? "400"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Üniversite :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_UNIV.toFixed(1) ?? "658"} m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='content-table-writer-body-head'>
                        <div className='property-header' >
                            <img width="50" height="50" src="https://img.icons8.com/stickers/100/university-building.png" alt="university-building" />
                            <h1 className='property-header-text'>Kamu Hizmetlerine Mesafe</h1>
                        </div>
                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>İdari Tesisler :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_IDAR.toFixed(2) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Adliye :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ADLI.toFixed(2) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Postane :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_POST.toFixed(2) ?? "400"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Banka :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_BANK.toFixed(2) ?? "658"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Güvenlik :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_GUVE.toFixed(2) ?? "3258"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>İtfaiye :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ITFA.toFixed(2) ?? "300"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Ana Okul :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ANAO.toFixed(2) ?? "25"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Avm :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_AVM.toFixed(2) ?? "152"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Pazar :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_PAZA.toFixed(2) ?? "211"} m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='content-table-writer-body-head .no-page-break'>
                        <div className='property-header' >
                            <img width="50" height="50" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-interest-dating-app-flaticons-lineal-color-flat-icons-2.png" alt="external-interest-dating-app-flaticons-lineal-color-flat-icons-2" />
                            <h1 className='property-header-text'>İlgi Alanlarına Mesafe</h1>
                        </div>

                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Kültürel Tesis :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_KULT.toFixed(2) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Sahil:</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_SAHI.toFixed(2) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Yeşil Alan :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_PARK.toFixed(2) ?? "400"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Spor Tesisi :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_SPOR.toFixed(2) ?? "658"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Restoran :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_REST.toFixed(2) ?? "658"} m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='content-table-writer-body-head'>
                        <div className='property-header' >
                            <img width="48" height="48" src="https://img.icons8.com/color-glass/48/mosque.png" alt="mosque" />
                            <h1 className='property-header-text'>Dini Tesislere Mesafe</h1>
                        </div>

                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>İbadethane :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_CAMI.toFixed(1) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Mezarlık :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_MEZA.toFixed(1) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Dini Eğitim :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_DINI.toFixed(1) ?? "400"} m</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='content-table-writer'>
                    <div className='content-table-writer-body-head'>
                        <div className='property-header' >
                            <img width="50" height="50" src="https://img.icons8.com/dusk/64/floor-plan.png" alt="floor-plan" />
                            <h1 className='property-header-text'>Bağımsız Bölüm Özellikleri</h1>
                        </div>
                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Alan :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.alan ?? "220"} m²</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Daire No :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.BB_No ?? "2"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Balkon Sayısı :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.Balkon ?? "0"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Banyo Sayısı :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.Banyo ?? "2"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Kat :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.BulunduguK ?? "3"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Manzara :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.MANZARA ?? "Deniz"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Oda Sayısı :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.Oda ?? "5"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Oda Planlama :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.Oda_Tipi ?? "3+1"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Cephe :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.directionT ?? "Kuzey"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Isı Yalıtımı:</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.IsıYalıt ?? "Yok"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Çocuk Oyun Alanı :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.CocukOyunA ?? "Var"}</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Asansör :</td>
                                    <td className='list-item-value-writer'>{bagimsizBolum?.AsansorMev ?? "Var"}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className='content-table-writer-body-head .no-page-break'>
                        <div className='property-header' >
                            <img width="40" height="40" src="https://img.icons8.com/officel/40/ground-transportation.png" alt="ground-transportation" />
                            <h1 className='property-header-text'>Ulaşım Noktaraına Mesafe</h1>
                        </div>
                        <table className='content-table-writer-body' >
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Otobüs :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_OTOB.toFixed(2) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Minibüs :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_MINI.toFixed(2) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Taksi :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_TAXI.toFixed(2) ?? "400"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Otopark:</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_OTOP.toFixed(2) ?? "658"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Anayol:</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ANAY.toFixed(2) ?? "658"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Cadde:</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_CADD.toFixed(2) ?? "658"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Sokak:</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_SOKA.toFixed(2) ?? "658"} m</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className='content-table-writer-body-head .no-page-break'>
                        <div className='property-header' >
                            <img width="48" height="48" src="https://img.icons8.com/dusk/64/hospital.png" alt="hospital" />
                            <h1 className='property-header-text'>Sağlık Tesislerine  Mesafe</h1>
                        </div>
                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Acil :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ACIL.toFixed(2) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Eczane :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_ECZA.toFixed(2) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Hastane :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_HAST.toFixed(2) ?? "400"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Asm :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_SAGL.toFixed(2) ?? "658"} m</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className='content-table-writer-body-head .no-page-break'>
                        <div className='property-header' >
                            <img width="50" height="50" src="https://img.icons8.com/arcade/64/fast-cart.png" alt="fast-cart" />
                            <h1 className='property-header-text'>Alışveriş Tesislerine Mesafe</h1>
                        </div>
                        <table className='content-table-writer-body'>
                            <tbody>
                                <tr>
                                    <td className='list-item-head-writer'>Alışveriş Merkezi :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_AVM.toFixed(2) ?? "220"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Çarşı Merkezi:</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_CARS.toFixed(2) ?? "299"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Market :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_MARK.toFixed(2) ?? "400"} m</td>
                                </tr>
                                <tr>
                                    <td className='list-item-head-writer'>Pazar Alanı :</td>
                                    <td className='list-item-value-writer'>{mimariBina?.OKLID_PAZA.toFixed(2) ?? "400"} m</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfWriter;
