import React from 'react'
import { Alert, Space, Spin } from 'antd';
import "../styles/loading.css"
const Loading = () => {
    return (
        <div className='loading-container' >
            <Spin size="large" tip="Loading...">
                <div className="content" />
            </Spin>
        </div>
    )
}

export default Loading