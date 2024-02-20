import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

const BuildLayer = ({ setLayerState, layerState }) => {

    const onChange = (checkedValues) => {
        
    };
    console.log(layerState)
    return (
        <div>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col span={8}>
                        <Checkbox value="bina3D">Bina</Checkbox>
                    </Col>                  
                    <Col span={8}>
                        <Checkbox value="yol">Yol</Checkbox>
                    </Col> 
                </Row>
            </Checkbox.Group>
        </div>
    )
}

export default BuildLayer;
