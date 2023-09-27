import React from 'react'
import "../../styles/navbar.css";
import {AiOutlineAppstoreAdd} from "react-icons/ai"
const Navbar = () => {
  return (
    <div className='navbar-container' >
        <div className='navbar-add-layer'  >
            <AiOutlineAppstoreAdd size={25}  />
        </div>
    </div>
  )
}

export default Navbar