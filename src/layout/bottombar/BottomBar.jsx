import React from 'react'
import "../../styles/bottombar.css"
import { useSelector, useDispatch } from 'react-redux'
import { handleModalContent, openModal } from '../../redux/slices/modalSlice'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import buffer from "../../assets/square.png";
import layer from "../../assets/layers.png";


const BottomBar = ({ hoveredCoordinates }) => {
    const propertiesValues = useSelector((state) => state.properties.propertiesValue)

    const dispatch = useDispatch();

    const handleOpenModal = (modalContentValue) => {
        dispatch(handleModalContent(modalContentValue))
        dispatch(openModal())
    }

    return (
        <div
            style={{
                width: propertiesValues.length !== 0 ? `calc(100% - 500px)` : "100%"
            }}
            className='bottombar-container' >
            <div style={{
                paddingRight: propertiesValues.length !== 0 ? `0` : "250px"
            }} className='bottombar-container-menu' >
                <div className='bottombar-container-left'>
                    <div className='bottombar-menus-add-layer' >
                        <AiOutlineAppstoreAdd
                            className='bottombar-menus-icon'
                            onClick={() => handleOpenModal("upload")} size={25} />
                    </div>
                    <div className='bottombar-menus-item' >
                        <img className='bottombar-menus-item-img' src={buffer} />
                    </div>
                    <div className='bottombar-menus-item' >
                        <img className='bottombar-menus-item-img' src={layer} />
                    </div>
                    <div className='bottombar-menus-item'>
                        <svg onClick={() => handleOpenModal("sunnyLight")} className='bottombar-menus-item-img' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                            <radialGradient id="w~INujfpQanMh___D7Au2a_8EUmYhfLPTCF_gr1" cx="24" cy="24" r="22" gradientUnits="userSpaceOnUse"><stop offset=".724" stop-color="#ffed54"></stop><stop offset=".779" stop-color="#ffe649"></stop><stop offset=".877" stop-color="#ffd22d"></stop><stop offset="1" stop-color="#ffb300"></stop></radialGradient><path fill="url(#w~INujfpQanMh___D7Au2a_8EUmYhfLPTCF_gr1)" d="M24,2l1.421,1.474c0.93,0.965,2.388,1.196,3.571,0.566l1.807-0.963l0.896,1.841	c0.586,1.205,1.902,1.876,3.222,1.641l2.016-0.357l0.283,2.028c0.185,1.328,1.229,2.371,2.557,2.557l2.028,0.283l-0.357,2.016	c-0.234,1.32,0.436,2.635,1.641,3.222l1.841,0.896l-0.963,1.807c-0.631,1.183-0.4,2.641,0.566,3.571L46,24l-1.474,1.421	c-0.965,0.93-1.196,2.388-0.566,3.571l0.963,1.807l-1.841,0.896c-1.205,0.586-1.876,1.902-1.641,3.222l0.357,2.016l-2.028,0.283	c-1.328,0.185-2.371,1.229-2.557,2.557l-0.283,2.028l-2.016-0.357c-1.32-0.234-2.635,0.436-3.222,1.641l-0.896,1.841l-1.807-0.963	c-1.183-0.631-2.641-0.4-3.571,0.566L24,46l-1.421-1.474c-0.93-0.965-2.388-1.196-3.571-0.566l-1.807,0.963l-0.896-1.841	c-0.586-1.205-1.902-1.876-3.222-1.641l-2.016,0.357l-0.283-2.028c-0.185-1.328-1.229-2.371-2.557-2.557l-2.028-0.283l0.357-2.016	c0.234-1.32-0.436-2.635-1.641-3.222l-1.841-0.896l0.963-1.807c0.631-1.183,0.4-2.641-0.566-3.571L2,24l1.474-1.421	c0.965-0.93,1.196-2.388,0.566-3.571l-0.963-1.807l1.841-0.896c1.205-0.586,1.876-1.902,1.641-3.222l-0.357-2.016l2.028-0.283	c1.328-0.185,2.371-1.229,2.557-2.557l0.283-2.028l2.016,0.357c1.32,0.234,2.635-0.436,3.222-1.641l0.896-1.841l1.807,0.963	c1.183,0.631,2.641,0.4,3.571-0.566L24,2z"></path><linearGradient id="w~INujfpQanMh___D7Au2b_8EUmYhfLPTCF_gr2" x1="8.092" x2="35.996" y1="8.092" y2="35.996" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset="1" stop-color="#e36001"></stop></linearGradient><path fill="url(#w~INujfpQanMh___D7Au2b_8EUmYhfLPTCF_gr2)" d="M24,7C14.611,7,7,14.611,7,24s7.611,17,17,17s17-7.611,17-17S33.389,7,24,7z"></path>
                        </svg>
                    </div>
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