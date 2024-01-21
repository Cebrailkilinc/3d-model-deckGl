import React, { Suspense, useState, useEffect, useRef } from 'react';
import { MdLocationPin } from "react-icons/md"
import { Button, Popover } from 'antd';
import "./styles/container.css"
import "mapbox-gl/dist/mapbox-gl.css";
import { Input, Radio, Space, Switch } from 'antd';
import { Deck } from 'deck.gl';


//Geograpich layers
import Map, {
  Source,
  Layer,
  useControl,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer, ScatterplotLayer, IconLayer } from '@deck.gl/layers';

import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
  OrbitView,
  PointLight,
  DirectionalLight,
  _CameraLight as CameraLight
} from '@deck.gl/core';
import SunCalc from 'suncalc';

//Redux
import {
  addMimariBina,
  addBagimsizBolum,
  addBalkon,
  addParsel,
  addYol
} from './redux/slices/propertiesSlice';
import { useDispatch, useSelector } from "react-redux";

//Components
import Navbar from './layout/navbar/Navbar';
import LayerModal from './components/LayerModal';
import BottomBar from './layout/bottombar/BottomBar';
import LeftTop from './layout/properties/left-top/left-top';
import RightTop from './layout/properties/right-top/right-top';
import LeftBottom from './layout/properties/left-bottom/left-bottom';
import MiddleLeftBottom from './layout/properties/middle-left-bottom/middle-left-bottom';
import MiddleRightBottom from './layout/properties/middle-right-bottom/middle-right-bottom';
import RightBottom from './layout/properties/right-bottom/right-bottom';
//Utilities
import { landCover } from './utilities/landCover';

//import datas
import bagimsizBolum3D from "../data/new/bagimsizBolum.json"
import bina3D from "../data/new/bina3D.json"
import kapiGirisi from "../data/new/kapiGirisi.json"
import yol from "../data/new/yol.json"
import parsel2d from "../data/new/parsel2d.json"
import parsel3d from "../data/new/parsel3d.json"
import ekYapi from "../data/new/ekYapi.json";

//Functions
import { handleBuildProperties } from './functions';


const INITIAL_VIEW_STATE = {
  latitude: 40.649687967664747,
  longitude: 35.809093508628486,
  zoom: 15,
  maxZoom: 20,
  pitch: 45,
  bearing: 0
};

function App() {

  const [color, setColor] = useState("")
  const [hoveredCoordinates, setHoveredCoordinates] = useState({ lat: 0, long: 0 });
  const [buildingId, setBuildingId] = useState({ binaId: "", katId: "", parselId: "" });
  const [clickedType, setClickedType] = useState("")
  const [switchedControl, setSwitchedControl] = useState(true)
  const [allData, setAllData] = useState(
    {
      bagimsizBolum: null,
      parselOzellikleri: null,
      binaOzellkleri: null,
    })
  const [mapLayer, setMapLayer] = useState("mapbox://styles/mapbox/satellite-v9");
  const [clock, setClock] = useState(1)
  const dispatch = useDispatch();
  const switchRef = useRef();

  const onChangeLayer = (e) => {
    setMapLayer(e.target.value);
  };

  const { mimariBina, bagimsizBolum } = useSelector(state => state.properties)


  const content = (
    <Radio.Group onChange={onChangeLayer} value={mapLayer} >
      <Space direction="vertical">
        <Radio value={"mapbox://styles/mapbox/satellite-v9"}>Satelite</Radio>
        <Radio value={"mapbox://styles/mapbox/streets-v12"}>Street</Radio>
        <Radio value={"mapbox://styles/mapbox/dark-v11"}>Dark Street</Radio>
        <Radio value={"mapbox://styles/mapbox/navigation-night-v1"} >Navigation Night</Radio>
        <Radio value={"mapbox://styles/mapbox/navigation-day-v1"} >Navigation Day</Radio>
      </Space>
    </Radio.Group>
  );





  useEffect(() => {
    //Binaya tıklanıldığında
    if (clickedType === "MimariBina" && mimariBina) {
      var parcelNo = mimariBina?.parcelNo;
      var resultFeatureParcel = parsel3d.features.find(function (feature) {
        return feature.properties.parselNo === parcelNo;
      });
      dispatch(addParsel(resultFeatureParcel.properties))
    }


    //Binaya tıklanıldığında
    if (clickedType === "BagimsizBolum" && bagimsizBolum) {
      var buildingId = bagimsizBolum.gml_pare_1;
      var resultFeature = bina3D.features.find(function (feature) {
        return feature.properties.MB_ID === buildingId;
      });   
      dispatch(addMimariBina(resultFeature?.properties))
      var parcelNo = resultFeature?.properties?.parcelNo
      var resultFeatureParcel = parsel3d.features.find(function (feature) {
        return feature.properties.parselNo === parcelNo;
      });
      dispatch(addParsel(resultFeatureParcel?.properties))     
    }
    console.log(clickedType)
  },);


  // Get coordinate data
  const handleMapHover = (event) => {
    if (event.coordinate && event.coordinate.length >= 2) {
      setHoveredCoordinates({
        lat: event.coordinate[0],
        long: event.coordinate[1]
      });
    }
  }

  const createGeoJsonLayer = (id, data) => {
    return new GeoJsonLayer({
      id: id,
      data: data,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: (object) => {
        // object ile çalışarak, öğenin özelliklerine erişebilir ve rengini belirleyebilirsiniz.
        const value = object.properties
        if (value === color) {
          return [205, 204, 34]; // Tıklanıldığı andakli renk #kırmızı    
        } else {
          return [255, 0, 0]; //beyaz
        }
      }, // Rengi seçilen nesneye göre değiştir
      updateTriggers: {
        getFillColor: [color],
        // count değeri değiştiğinde renk güncellemesini tetikle
      },
      getLineColor: [255, 255, 255],
      // object ile çalışarak, öğenin özelliklerine erişebilir ve rengini belirleyebilirsiniz.
      pickable: true,
      onClick: (e) => {
        handleBuildProperties(e,
          setClickedType,
          setAllData,
          setBuildingId,
          dispatch,
          addMimariBina,
          addBagimsizBolum,
          addBalkon,
          addParsel,
          addYol,
          setColor);
      },
      // onHover: ({ object, x, y, isPicking }) => {


      //   const htmlElement = document.getElementById('map-section'); // Değiştirmek istediğiniz HTML elemanının ID'sini girin
      //   if (htmlElement) {
      //     htmlElement.style.cursor = "pointer"
      //   }

      // },

    });
  };



  var times = SunCalc.getTimes(new Date(), 35.80, 40.64);
  var sunrisePos = SunCalc.getPosition(times.sunrise, 35.80, 40.64);

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
  });

  const directionalLight = new DirectionalLight({
    color: [255, 255, 255],
    intensity: 0.8,
    direction: [1, 3, -5],
    _shadow: true,
  });
  const sunlightEffect = new LightingEffect({
    directionalLight, ambientLight
  });


  const datas = [bina3D, bagimsizBolum3D, kapiGirisi, yol, parsel2d, ekYapi]
  //all layers are collected here
  const layers = [
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [0, 0, 0, 0],
    }),
    datas.map((geojsonData, index) => createGeoJsonLayer(`geojson${index + 1}`, geojsonData)),
  ];



  return (
    <div className='map-container'>
      <LayerModal />
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='content'>
        <div className="section">
          Sol Bar
        </div>
        <div id='map-section' className="section">
          <DeckGL
            onHover={handleMapHover}
            layers={layers}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            effects={[sunlightEffect]}
            onError={(err) => {
              console.log("Deck_ERROR", err);
            }}
            
          >
            <img style={{ left: switchedControl ? "255px" : "10px", top: switchedControl ? "390px" : "540px" }} className='zoom-in' width="20" height="20" src="https://img.icons8.com/ultraviolet/40/plus-2-math.png" alt="plus-2-math" />
            <img style={{ left: switchedControl ? "255px" : "10px", top: switchedControl ? "370px" : "520px" }} className='zoom-out' width="20" height="20" src="https://img.icons8.com/ultraviolet/40/minus-2-math.png" alt="minus-2-math" />

            <div style={{ right: switchedControl ? "260px" : "10px" }} className='layer-button' >
              <Popover placement="leftTop" title={"Select Map Layer"} content={content}>
                <img
                  width="24" height="24"
                  src="https://img.icons8.com/fluency/48/layers.png"
                  alt="layers" />
              </Popover>
            </div>
            <Map
              mapLib={import('mapbox-gl')}
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
              }}
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} reuseMaps mapStyle={mapLayer} preventStyleDiffing={true}>
            </Map>
          </DeckGL>
        </div>
        <div ref={switchRef} style={{ display: "block" }} className='menu-content' >
          <div className="section-top-left">
            <LeftTop />
          </div>
          <div className="section-top-right">
            <RightTop />
          </div>
          <div className='bottom' >
            <div className="section-bottom">
              <LeftBottom/>
            </div>
            <div className="section-bottom">
              <MiddleLeftBottom/>
            </div>
            <div className="section-bottom">
              <MiddleRightBottom/> 
            </div>
            <div className="section-bottom">
              <RightBottom/>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-bar'>
        <BottomBar switchRef={switchRef} setSwitchedControl={setSwitchedControl} hoveredCoordinates={hoveredCoordinates} />
      </div>

    </div>

  );
}

export default App;