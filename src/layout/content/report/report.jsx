import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import PdfWriter from './pdf-writer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';
import headerImg from "../../../assets/pdf-img/forHeader.png";
import "./writer.css"
const Report = ({
    isReportModalOpen,
    handleReportCancel,
    handleReportOk,
    mimariBina,
    parsel,
    bagimsizBolum
}) => {

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    })

console.log(bagimsizBolum)

    return (
        <>
            <Modal width={1000} style={{ padding: "20px", }} title="Rapor Modulü" open={isReportModalOpen} onOk={() => {
                handlePrint(null, () => contentToPrint.current);
            }} onCancel={handleReportCancel}>
                <div  ref={contentToPrint}>
                    <img className="a4-image" src={headerImg} alt="Header Image" />
                    <PdfWriter style={{padding:"50px"}}/>
                </div>
            </Modal>
        </>

    )
}

export default Report