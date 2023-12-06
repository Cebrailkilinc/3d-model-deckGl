import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';

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
                        min={0}
                        max={24}
                        onChange={onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                    />
                </div>
                <div className='slider-container-input' >
                    <InputNumber
                        min={0}
                        max={24}
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