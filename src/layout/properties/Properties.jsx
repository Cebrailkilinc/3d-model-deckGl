import React from 'react'
import "../../styles/properties.css"
import { useSelector, useDispatch } from 'react-redux'
const Properties = () => {

    const propertiesValues = useSelector((state) => state.properties.propertiesValue)

    if (propertiesValues.length == 0) {
        return
    }
    const entries = Object.entries(propertiesValues.properties);

    return (
        <div id='properties' className='properties-container'>
            <h1 className='properties-head' >Öznitelik Değerler</h1>
            <div className='properties-body' >
                {
                    propertiesValues.length != 0 ? entries.map(([key, value],i) => {
                        return <div key={i} className='properties-container-row' >
                            <h6 className='row-first-name' >{`${key}:`}</h6>
                            <h6 className='row-last-name'>{`${value}`}</h6>
                        </div>
                    }) : null
                }
            
            </div>            
        </div>
    )
}

export default Properties