import React from 'react'
import "../../styles/bottombar.css"
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../redux/slices/modalSlice'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import buffer from "../../assets/square.png";
import layer from "../../assets/layers.png";


const BottomBar = ({hoveredCoordinates}) => {
    const propertiesValues = useSelector((state) => state.properties.propertiesValue)

    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(openModal())
    }
    return (
        <div
            style={{
                width: propertiesValues.length !== 0 ? `calc(100% - 520px)` : "100%"
            }}
            className='bottombar-container' >
            <div className='bottombar-container-menu' >
                <div className='bottombar-container-left'>
                    <div className='bottombar-menus-add-layer' >
                        <AiOutlineAppstoreAdd
                            className='bottombar-menus-icon'
                            onClick={handleOpenModal} size={25} />
                    </div>
                    <div className='bottombar-menus-item' >
                        <img className='bottombar-menus-item-img' src={buffer} />
                    </div>
                    <div className='bottombar-menus-item' >
                        <img className='bottombar-menus-item-img' src={layer} />
                    </div>
                </div>
                <div className='bottombar-container-right' >
                    <h3>lat:{hoveredCoordinates.lat.toFixed(5)}</h3>
                    <h3>long:{hoveredCoordinates.long.toFixed(5)}</h3>
                </div>
            </div>
        </div>
    )
}

export default BottomBar