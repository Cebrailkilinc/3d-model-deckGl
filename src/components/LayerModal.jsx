import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal,openModal } from '../redux/slices/modalSlice';
import Uploads from './Uploads';
const LayerModal = () => {

    
    const modalControl = useSelector((state) => state.modalControl.openModel)
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
           
            <Modal title="Basic Modal" open={modalControl} onOk={handleOk} onCancel={handleCancel}>
               <Uploads/>
            </Modal>
        </>
    )
}

export default LayerModal