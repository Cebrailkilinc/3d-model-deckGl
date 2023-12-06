import React from 'react'
const BottomProperties = ({ allData }) => {
    return (
        <div
            className='bottom-properties'
            style={{
                position: "absolute",
                bottom: "30px",
                backgroundColor: "#E8E8E8",
                width: "100%",
                height: "180px",
                zIndex: 2,
            }}
        >
            <div style={{
                height: "100%",
                width: "97%",
                margin: "auto",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                justifyContent: "space-between"

            }}>
                <div style={{ backgroundColor: "#4a5ae5", height: "90%", width: "90%", color: "white", borderRadius: "5px", overflowY: "auto",fontSize: "15px" }} >
                    <div style={{ padding: "10px" }}>
                        <div style={{display:"flex", gap:"20px"}}>
                            <img style={{position:"relative", top:"30px"}} width="80" height="80" title="" src="https://www.arcgis.com/sharing/rest/content/items/6475911dd83c45c1a2615f730bcc65eb/resources/images/widget_63/1654629737883.png" alt="" />
                            <div>
                            {
                                allData.bagimsizBolum && allData.bagimsizBolum.map((item, i) => {
                                    return (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                            <h1 style={{ fontSize: "15px", fontWeight: 'bold', marginTop: "10px" }}>Bağımsız Bölüm Özellikleri</h1>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }} >
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px", }} >
                                                    <h3 style={{ fontWeight: 'lighter' }} >Manzara :</h3>
                                                    <h3>{"25"}</h3>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                                    <h3 style={{ fontWeight: 'lighter' }} >Cephe :</h3>
                                                    <h3>{"25"}</h3>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                                    <h3 style={{ fontWeight: 'lighter' }} >Bulunduğu Kat:</h3>
                                                    <h3>{"25"}</h3>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                                    <h3 style={{ fontWeight: 'lighter' }} >Alan:</h3>
                                                    <h3>{"25"}</h3>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                                    <h3 style={{ fontWeight: 'lighter' }} >Oda Sayısı:</h3>
                                                    <h3>{"25"}</h3>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                                    <h3 style={{ fontWeight: 'lighter' }} >Balkon Sayısı:</h3>
                                                    <h3>{"25"}</h3>
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                                    <h3 style={{ fontWeight: 'lighter' }} >Banyo Sayısı:</h3>
                                                    <h3>{"25"}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#4a5ae5", height: "90%", width: "90%", borderRadius: "5px", color: "white", overflowY: "auto",fontSize: "15px" }}>
                    <div style={{ padding: "10px" }} >
                        <div style={{ display: "flex", gap: "30px" }} >
                            <img style={{ position: "relative", top: "30px" }} width="64" height="64" src="https://img.icons8.com/dusk/64/museum.png" alt="museum" />
                            <div>
                                <h1 style={{ fontSize: "15px", fontWeight: 'bold', marginTop: "10px" }}>Kamu Hizmetlerine Mesafe</h1>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >İdari Tesisler:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_IDAR}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Adliye:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_ADLI}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Postane:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_POST}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Banka:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_BANK}</h3>

                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Güvenlik:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_GUVE}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >itfaiye:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_ITFA}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#4a5ae5", height: "90%", width: "90%", borderRadius: "5px", color: "white", overflowY: "auto",fontSize: "15px" }}>
                    <div style={{ padding: "10px" }} >
                        <div style={{ display: "flex", gap: "20px" }} >
                            <img style={{ position: "relative", top: "30px" }} width="96" height="96" src="https://img.icons8.com/emoji/96/bus-stop-emoji.png" alt="bus-stop-emoji" />
                            <div>
                                <h1 style={{ fontSize: "15px", fontWeight: 'bold', marginTop: "10px" }}>Ulaşım Fonksiyonlarına Mesafe</h1>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Taksi:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_TAXI}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Otopark:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_OTOP}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Minibüs:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_MINI}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Anayol:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_ANAY}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Cadde:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_CADD}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Sokak:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_SOKA}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#4a5ae5", height: "90%", width: "90%", borderRadius: "5px", color: "white", overflowY: "auto" }}>
                    <div style={{ padding: "10px" }} >
                        <div style={{ display: "flex", gap: "20px",fontSize: "15px", }} >
                            <img style={{ position: "relative", top: "30px" }} width="64" height="64" src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/external-hospital-healthcare-tulpahn-outline-color-tulpahn.png" alt="external-hospital-healthcare-tulpahn-outline-color-tulpahn" />
                            <div>
                                <h1 style={{ fontSize: "15px", fontWeight: 'bold', marginTop: "10px" }}>Sağlık Tesislerine Mesafe</h1>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Acil:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_ACIL}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Eczane:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_ECZA}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Hastane:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_HAST}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >ASM:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_SAGL}</h3>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                                        <h3 style={{ fontWeight: 'lighter' }} >Cadde:</h3>
                                        <h3>{allData.binaOzellkleri && allData.binaOzellkleri.OKLID_CADD}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default BottomProperties