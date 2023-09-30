import React from 'react'
import "../../styles/navbar.css";
import {AiOutlineAppstoreAdd} from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../redux/slices/modalSlice';

const Navbar = () => {

  const modalControl = useSelector((state) => state.modalControl.openModel)
  const dispatch = useDispatch();

  const handleOpenModal = ()=>{
    dispatch(openModal())
  }


  return (
    <div className='navbar-container' >
        <div className='navbar-add-layer'  >
            <AiOutlineAppstoreAdd onClick={handleOpenModal} size={25}  />
        </div>
    </div>
  )
}

export default Navbar