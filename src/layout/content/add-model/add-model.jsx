import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import "./add-model.css"
import { Drawer } from 'antd';
const AddModel = ({ modalPosition, setModalPosition, openNew3DModelDrawer, setNewOpen3DModelDrawer }) => {

    const onClose = () => {
        setNewOpen3DModelDrawer(false);
    };


    return (
        <Drawer mask={false} title="3D MODEL EKLEME" onClose={onClose} open={openNew3DModelDrawer}>

        </Drawer>
    )
}

export default AddModel