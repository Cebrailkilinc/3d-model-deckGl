import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import PdfWriter from './pdf-writer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';
import headerImg from "../../../assets/pdf-img/forHeader.png";
import "./writer.css"
import { Alert } from 'antd';
const Report = ({
    isReportModalOpen,
    handleReportCancel,
    handleReportOk,
    mimariBina,
    parsel,
    bagimsizBolum
}) => {


    if (!bagimsizBolum) {
        return <Alert message="Success Text" type="success" />
    }

    console.log(bagimsizBolum)

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Taşınma Değerleme Raporu ",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
        pageStyle: `
        @page {
          size: A4 ;
          margin: 20mm 10mm;
        }
       
          body {
            -webkit-print-color-adjust: exact;
          }
      `,
    })



    return (
        <>
            <Modal width={1000} style={{ padding: "20px", }} title="Rapor Modulü" open={isReportModalOpen} onOk={() => {
                handlePrint(null, () => contentToPrint.current);
            }} onCancel={handleReportCancel}>
                <div ref={contentToPrint}>
                    <img className="a4-image" src={headerImg} alt="Header Image" />
                    <PdfWriter mimariBina={mimariBina} bagimsizBolum={bagimsizBolum} style={{ padding: "50px" }} />
                </div>
            </Modal>
        </>

    )
}

export default Report