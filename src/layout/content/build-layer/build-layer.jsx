import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

const BuildLayer = ({ setLayerState, layerState }) => {

    const onChange = (checkedValues) => {
        const newLayer = { ...layerState };
        Object.keys(newLayer).forEach((key) => {
            newLayer[key] = checkedValues.includes(key) && checkedValues.includes(key) ? true : false;
        });
        setLayerState(newLayer);
    };

    return (
        <div>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col span={8}>
                        <Checkbox value="bina3D">Bina</Checkbox>
                    </Col>                  
                    <Col span={8}>
                        <Checkbox value="bagimsizBolum3D">Bina</Checkbox>
                    </Col> 
                </Row>
            </Checkbox.Group>
        </div>
    )
}

export default BuildLayer;
