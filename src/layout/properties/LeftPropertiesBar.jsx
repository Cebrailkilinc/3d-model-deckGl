import React from 'react'
import { useSelector } from 'react-redux'

const LeftPropertiesBar = () => {
    const properties = useSelector((state) => state.properties.propertiesValue)
    const propertiesValues = properties && properties.properties
    return (
        <div>
            <div style={{
                position: "fixed",
                backgroundColor: "#E8E8E8",
                height: "60%",
                width: "25%",
                padding: "20px",
                zIndex:2,
                fontSize: "15px"
            }} >

                <div style={{
                    backgroundColor: "#4a5ae5",
                    zIndex: 2,
                    height: "100%",
                    borderRadius: "5px",
                    color: "white",
                    padding: "10px",
                    display: "flex",
                    alignItems: "",
                    gap: "20px",

                }} >
                    <img width="100" height="100" src="https://img.icons8.com/plasticine/100/building.png" alt="building" />
                    <div style={{
                        display: "flex",
                        
                        flexDirection: "column",
                        gap: "20px",
                    }} >
                      
                        <h1 style={{ fontSize: "25px", fontWeight: 'bold' }} >Bina Özellikleri</h1>
                        <div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Bina Yaşı:</h3>
                                    <h3>{propertiesValues && propertiesValues?.BinaYas202}</h3>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Kat Adet:</h3>
                                    <h3>{propertiesValues && propertiesValues.Kat_Adet}</h3>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Çatı Alanı:</h3>
                                    <h3>{propertiesValues && propertiesValues.CatiAln}</h3>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Yapı Yüksekliği:</h3>
                                    <h3>{propertiesValues && propertiesValues.yapıYuk}</h3>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Yapı Tarihi:</h3>
                                    <h3>{propertiesValues && propertiesValues.yapıDate}</h3>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Parsel No:</h3>
                                    <h3>{propertiesValues && propertiesValues.parcelNo}</h3>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Blok Numarası:</h3>
                                    <h3>{propertiesValues && propertiesValues.blockNumbe}</h3>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                    <h3 style={{ }} >Bağımsız Bölüm Sayısı:</h3>
                                    <h3>{propertiesValues && propertiesValues.bagımsız}</h3>
                                </div>
                            </div>
                            <img />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftPropertiesBar