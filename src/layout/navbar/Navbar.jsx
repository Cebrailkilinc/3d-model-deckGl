import React from 'react'
import "../../styles/navbar.css";
import { AiOutlineAppstoreAdd } from "react-icons/ai"
import { CiUser } from "react-icons/ci"
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../redux/slices/modalSlice';
import { Avatar, Space } from 'antd';

import home from "../../assets/home.png"
const Navbar = () => {

  const modalControl = useSelector((state) => state.modalControl.openModel)
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal())
  }

  return (
    <div style={{ zIndex: 2 }} className='navbar-container' >
      <div style={{ zIndex: 2 }} className='navbar-container-menu'>
        <div style={{ zIndex: 2 }} className='menu-left'  >
          <img width="40" height="40" src="https://img.icons8.com/arcade/64/home.png" alt="home" />
          <h1 className='menu-head'>2B/3B Taşınmaz Yönetim Platformu</h1>
        </div>
        <div className='menu-user'>

        </div>
      </div>
    </div>
  )
}

export default Navbar