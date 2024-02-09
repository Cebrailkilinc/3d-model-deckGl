import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import "./add-model.css"

const AddModel = ({ modalPosition, setModalPosition }) => {
    const [inputValue, setInputValue] = useState(1);

    const onChangeX = (newXValue) => {
        setModalPosition(prevState => ({
            ...prevState,
            x: newXValue,
        }));
    };
    const onChangeY = (newYValue) => {
        setModalPosition(prevState => ({
            ...prevState,
            y: newYValue,
        }));
    };
    const onChangeZ = (newZValue) => {
        setModalPosition(prevState => ({
            ...prevState,
            z: newZValue,
        }));
    };
    const onChangeSize = (newSizeValue) => {
        setModalPosition(prevState => ({
            ...prevState,
            size: newSizeValue,
        }));
    }

    return (
        <div className='slider' >
            <div>
                <h1>Position - X</h1>
                <Row  >
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={360}
                            onChange={onChangeX}
                            value={typeof modalPosition.x === 'number' ? modalPosition.x : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={360}
                            style={{ margin: '0 16px' }}
                            value={modalPosition.x}
                            onChange={onChangeX}
                            size='small'
                        />
                    </Col>
                </Row>
            </div>
            <div>
                <h1>Position - Y</h1>
                <Row >
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={360}
                            onChange={onChangeY}
                            value={typeof modalPosition.y === 'number' ? modalPosition.y : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={360}
                            style={{ margin: '0 16px' }}
                            value={modalPosition.y}
                            onChange={onChangeY}
                            size='small'
                        />
                    </Col>
                </Row>
            </div>
            <div>
                <h1>Position - Z</h1>
                <Row >
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={360}
                            onChange={onChangeZ}
                            value={typeof modalPosition.z === 'number' ? modalPosition.z : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={360}
                            style={{ margin: '0 16px' }}
                            value={modalPosition.z}
                            onChange={onChangeZ}
                            size='small'
                        />
                    </Col>
                </Row>
            </div>
            <div>
                <h1>Building Size</h1>
                <Row >
                    <Col span={12}>
                        <Slider
                            min={1}
                            max={50}
                            onChange={onChangeSize}
                            value={typeof modalPosition.size === 'number' ? modalPosition.size : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1}
                            max={50}
                            style={{ margin: '0 16px' }}
                            value={modalPosition.size}
                            onChange={onChangeSize}
                            size='small'
                        />
                    </Col>
                </Row>
            </div>

        </div>
    )
}

export default AddModel