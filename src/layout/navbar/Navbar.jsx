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
          <img className='menu-logo' src={home} />
          <h1 className='menu-head'>2B/3B Taşınmaz Yönetim Platformu</h1>
        </div>
        <div className='menu-user'>
          <div className='menu-user-profile' >
            <Avatar className='avatar' shape="square" icon={<CiUser />} />
          </div>
          <h6>Cebrail Kılınç</h6>
        </div>
      </div>
    </div>
  )
}

export default Navbar