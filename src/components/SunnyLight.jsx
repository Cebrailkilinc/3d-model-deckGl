import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import "../styles/SunnyLight.css"
const SunnyLight = () => {
    const [inputValue, setInputValue] = useState(1);
    const onChange = (newValue) => {
        setInputValue(newValue);
    };
    return (
        <div className='slider-container' >
            <div className='slider-container-one' >                
                <div className='slider-container-rod'  >
                    <Slider
                        min={1}
                        max={20}
                        onChange={onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </div>
                <div className='slider-container-input' >
                    <InputNumber
                        min={1}
                        max={20}
                        style={{
                            margin: '0 16px',
                        }}
                        value={inputValue}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default SunnyLight