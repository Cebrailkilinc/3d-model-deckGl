import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

const BuildLayer = ({ setLayerState, layerState }) => {
    const [activeLayer, setActiveLayer] = useState(["bina3D","yol"])
    const onChange = (checkedValues) => {
        const newLayer = { ...layerState };
        Object.keys(newLayer).forEach((key) => {
            newLayer[key] = checkedValues.includes(key) && checkedValues.includes(key) ? true : false;
        });
        setLayerState(newLayer);
        setActiveLayer(checkedValues)
        console.log(checkedValues)
    };
    console.log(layerState)
    return (
        <div>
            <Checkbox.Group checked={activeLayer}  style={{ width: '100%' }} onChange={onChange}>
                <Row>
                    <Col span={8}>
                        <Checkbox value="bina3D" checked={true} >Bina</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="bagimsizBolum3D" checked={layerState.bagimsizBolum3D}>Bağımsız Bölüm</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="parsel2d" checked={layerState.parsel2d}>Parsel</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="yol" checked={true}>Yol</Checkbox>
                    </Col>
                    <Col span={8}>
                        <Checkbox value="ekYapi" checked={layerState.ekYapi}>Ek Yapı</Checkbox>
                    </Col>                 
                </Row>
            </Checkbox.Group>
        </div>
    )
}

export default BuildLayer;
