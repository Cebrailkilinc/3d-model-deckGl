import React from 'react'
import { useSelector } from 'react-redux';

const RightPropertiesBar = ({ allData }) => {
    const propertiesValues = useSelector((state) => state.properties.propertiesValue)
 
    return (
        <div
            style={{
                position: "fixed",
                backgroundColor: "#E8E8E8",
                width: "25%",
                height: "60%",
                right: "1px",
                padding: "20px",

            }} >
            <div
                style={{
                    backgroundColor: "#4a5ae5",
                    zIndex: 2,
                    height: "100%",
                    borderRadius: "5px",
                    overflowY: "auto",
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
                    gap: "50px",

                }} >
                    <img style={{position:"relative", top:"80px",left:"20px"}} width="64" height="64" title="" src="https://www.arcgis.com/sharing/rest/content/items/6475911dd83c45c1a2615f730bcc65eb/resources/images/widget_68/1654630726344.png" />
                    <div style={{display:"flex", flexDirection:"column", gap:"20px"}} >
                        <h1 style={{ fontSize: "25px", fontWeight: 'bold' }} >İmar Özellikleri</h1>
                        <div  >
                            {
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Ada No:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.adaNo}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Parsel No:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.KAKS}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >TAKS:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.TAKS}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >KAKS:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.KAKS}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Alan:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.Parsel_Ala}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Mülkiyet:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.Mulkiyet_D}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Yapı Nizamı:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.YAPI_NIZ}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Eğim:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.EGIM}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Cephe Sayısı:</h3>
                                        <h3>{allData.parselOzellikleri && allData.parselOzellikleri.KAKS}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "start", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Nitelik:</h3>
                                        <h3 style={{ maxWidth: "150px" }} >{allData.parselOzellikleri && allData.parselOzellikleri.nitelik}</h3>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightPropertiesBar