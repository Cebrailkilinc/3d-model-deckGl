import React, { useState } from 'react'
import "../styles/upload.css"

import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { addData } from "../redux/slices/dataSlice"
import Item from 'antd/es/list/Item';
import { useEffect } from 'react';
import { closeModal, openSpin, closeSpin } from '../redux/slices/modalSlice';
import Loading from './Loading';
import fs from "fs";


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
    dispatch(openSpin())
    try {
      fetch("http://127.0.0.1:8000/uploadfiles/",
        {
          method: "POST",
          body: formData
        }
      ).then((response) => response.json()).then((result) => {
        console.log(result)

        const jsonString = JSON.stringify(result, null, 2);
        const filePath = '../../data/cebrail.json';

        console.log(result)
        dispatch(addData(result))
        dispatch(closeSpin())
      })
    } catch (error) {
      console.error("Hata:", error.message);
    }
    dispatch(closeModal())
  }




  return (
    <div>
      <form onSubmit={sendFile} className='file-upload-container' >
        <label className="custom-file-upload">
          <input type='file' onChange={handleInputChange} multiple />
          {selectedFiles.length != 0 ? "Files Selected!" : "Custom Upload"}
        </label>
        <button className='form-submit-button' type='submit'>
          Verileri Yükle
        </button>
      </form>
      <div>

      </div>
    </div>
  )
}

export default Uploads