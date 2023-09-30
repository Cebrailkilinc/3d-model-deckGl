import React, { useState } from 'react'
import "../styles/upload.css"

import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { addData } from "../redux/slices/dataSlice"



const Uploads = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const handleInputChange = (e) => {
    setSelectedFiles(e.target.files)
  }

  const sendFile = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('files', file);
    }

    try {
      fetch("http://127.0.0.1:8000/uploadfiles/",
        {
          method: "POST",
          body: formData
        }
      ).then((response) => response.json()).then((result) => {
        dispatch(addData(result))
      })

    } catch (error) {
      console.error("Hata:", error.message);
    }
  }

  return (
    <div className='upload-container' >
      <form onSubmit={sendFile} className='file-upload-container' >
        <input type='file' onChange={handleInputChange} multiple />
        <button className='form-submit-button' type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Uploads