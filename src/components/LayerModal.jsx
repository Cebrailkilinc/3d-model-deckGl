import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '../redux/slices/modalSlice';
import Uploads from './Uploads';
import SunnyLight from './SunnyLight';

const LayerModal = () => {


    const modalControl = useSelector((state) => state.modalControl.openModel)
    const modalContentControl = useSelector((state) => state.modalControl.modalContent)
    const dispatch = useDispatch();
   
    const showModal = () => {
        dispatch(openModal());
    };
    const handleOk = () => {
        dispatch(closeModal());
    };
    const handleCancel = () => {
        dispatch(closeModal());
    };



    return (
        <>
            <Modal footer={null} title="Dosya Yükleme Modulu"
                open={modalControl} onOk={handleOk}
                onCancel={handleCancel}>
                {modalContentControl == "upload" ? <Uploads /> : null} 
                {modalContentControl == "sunnyLight" ? <SunnyLight/> : null}                
            </Modal>
        </>
    )
}

export default LayerModal