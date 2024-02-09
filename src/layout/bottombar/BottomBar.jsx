import React from 'react'
import "../../styles/bottombar.css"
import { useSelector, useDispatch } from 'react-redux'
import { handleModalContent, openModal } from '../../redux/slices/modalSlice'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import buffer from "../../assets/square.png";
import layer from "../../assets/layers.png";
import { Input, Radio, Space, Switch } from 'antd';

const BottomBar = ({ hoveredCoordinates, switchRef, setSwitchedControl }) => {
    const propertiesValues = useSelector((state) => state.properties.propertiesValue)

    const dispatch = useDispatch();

    //Table opening
    const onChangeSwitched = (checked) => {
        const myElement = switchRef.current;
        // Eğer görünürse, gizle; değilse, göster
        if (checked) {
            myElement.style.display = "block";
            setSwitchedControl(true)
        } else {
            myElement.style.display = "none";
            setSwitchedControl(false)
        }
    };

    const handleOpenModal = (modalContentValue) => {
        dispatch(handleModalContent(modalContentValue))
        dispatch(openModal())
    }

    return (
        <div
            style={{
                width: "100%"
            }}
            className='bottombar-container' >
            <div style={{

            }} className='bottombar-container-menu' >
                <div className='bottombar-container-left'>
                    <div className='bottombar-menus-add-layer' >
                        <AiOutlineAppstoreAdd
                            className='bottombar-menus-icon'
                            onClick={() => handleOpenModal("upload")} size={15} />
                    </div>
                    <div style={{ marginBottom: "5px" }} className='bottombar-menus-item'>
                        <Switch size='small' defaultChecked onChange={onChangeSwitched} />
                    </div>
                    {/* <div  className='bottombar-menus-item'>
                        <img width="24" height="24" src="https://img.icons8.com/color/48/rgb-circle-2--v1.png" alt="rgb-circle-2--v1" />
                    </div> */}
                </div>
                <div className='bottombar-container-right' >
                    <h3>lng: {hoveredCoordinates.lat.toFixed(5)}</h3>
                    <h3>lat: {hoveredCoordinates.long.toFixed(5)}</h3>
                </div>
            </div>
        </div>
    )
}

export default BottomBar