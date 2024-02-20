import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

const BuildLayer = ({ setLayerState, layerState }) => {

    const onChange = (checkedValues) => {
        console.log(checkedValues)
        setLayerState(checkedValues)
    };
    console.log(layerState)
    return (
        <div>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col span={8}>
                        <Checkbox value={0} >Bina</Checkbox>
                    </Col>                  
                    <Col span={8}>
                        <Checkbox value={1}>Bağımsız Bölüm</Checkbox>
                    </Col> 
                    <Col span={8}>
                        <Checkbox value={2}>Yol</Checkbox>
                    </Col>                  
                    <Col span={8}>
                        <Checkbox value={3}>Ek Yapı</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value={4}>Parsel</Checkbox>
                    </Col>
                </Row>
            </Checkbox.Group>
        </div>
    )
}

export default BuildLayer;
