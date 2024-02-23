import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { MdLocationPin } from "react-icons/md"
import { Button, Popover } from 'antd';
import "./styles/container.css"
import "mapbox-gl/dist/mapbox-gl.css";
import { Input, Radio, Space, Switch } from 'antd';
import { Deck } from 'deck.gl';
import DrawControl from './layers/draw/draw-control';
import ControlPanel from './layers/draw/control-panel';
//CEBRAİL KILINÇ
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
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { BitmapLayer } from '@deck.gl/layers';
import { Col, InputNumber, Row, Slider, } from 'antd';
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

import bina3D from "../data/new/bina3D.json"
import bagimsizBolum3D from "../data/new/bagimsizBolum3D.json"
import kapiGirisi from "../data/new/kapiGirisi.json"
import yol from "../data/new/yol.json"
import parsel2d from "../data/new/parsel2d.json"
import parsel3d from "../data/new/parsel3d.json"
import ekYapi from "../data/new/ekYapi.json";

//Functions
import { handleBuildProperties } from './functions';
import MiddleBottomEducation from './layout/properties/middle-bottom-education/middle-bottom-education';
import MiddleBottomMosque from './layout/properties/middle-bottom-mosque/middle-bottom-mosque';
import BottomMiddleTransport from './layout/properties/bottom-middle-transport/bottom-middle-transport';
import AddModel from './layout/content/add-model/add-model';
import BuildLayer from './layout/content/build-layer/build-layer';
import MiddleBottomInterest from './layout/properties/middle-bottom-interest/middle-bottom-interest';
import BottomMiddleIndustry from './layout/properties/bottom-middle-industry/bottom-middle-industry';




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
  const [data, setData] = useState({
    type: 'FeatureCollection',
    features: [],
  });
  const [mapController, setMapController] = useState(true)
  const [zoom, setZoom] = useState(17)
  const [layerState, setLayerState] = useState([]);




  const dispatch = useDispatch();
  const switchRef = useRef();

  const onChangeLayer = (e) => {
    setMapLayer(e.target.value);
  };

  const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)

  const INITIAL_VIEW_STATE = {
    latitude: 40.64881000131992,
    longitude: 35.80987460443845,
    zoom: zoom,
    maxZoom: 20,
    pitch: 45,
    bearing: 0
  };

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

    if (clickedType === "MimariBina" && mimariBina) {
      var parcelNo = mimariBina?.parcelNo;
      var resultFeatureParcel = parsel3d.features.find(function (feature) {
        return feature.properties.parselNo === parcelNo;
      });
      dispatch(addParsel(resultFeatureParcel.properties))
    }
    if (clickedType === "parsel" && mimariBina) {
      dispatch(addParsel(parsel))
    }

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

          if (value._5 === "Balkon") {
            return [132, 210, 108];
          }
          if (value.PARCELID && value.nitelik) {
            return [164, 165, 164];
          }

          return [255, 210, 108]; //beyaz
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

    });
  };



  var times = SunCalc.getTimes(new Date(), 35.80, 40.64);
  var sunrisePos = SunCalc.getPosition(times.sunrise, 35.80, 40.64);

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentSecond = currentDate.getSeconds();

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
  });

  let directionalLight = new DirectionalLight({
    color: [255, 255, 255],
    intensity: 0.8,
    direction: [sunrisePos.azimuth, sunrisePos.altitude, -5],
    _shadow: false,
  });

  if ((currentHour > times.sunrise.getHours()) && (currentHour < times.sunset.getHours())) {
    directionalLight = new DirectionalLight({
      color: [255, 255, 255],
      intensity: 0.8,
      direction: [sunrisePos.azimuth, sunrisePos.altitude, -5],
      _shadow: true,
    });
  }

  const sunlightEffect = new LightingEffect({
    directionalLight,
    ambientLight
  });

  const datas = [bina3D, bagimsizBolum3D, yol, ekYapi, parsel2d]

  const datass = [
    { bina3D: true, bagimsizBolum3D: true, yol: true, ekYapi: false, parsel2d: true }]


  
  const layers = [
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [0, 0, 0, 0],
    }),
    datas && layerState.map(index => datas[index]).map((geojsonData, index) => {      
      
      return createGeoJsonLayer(`geojson${index + 1}`, geojsonData)
    }),
    new BitmapLayer({
      id: 'bitmap-layer',
      bounds: [-122.45, 37.75, -122.43, 37.78],
      image: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-districts.png'
    })
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
            controller={mapController}
            effects={[sunlightEffect]}
            onError={(err) => {
              console.log("Deck_ERROR", err);
            }}


          >
            <div style={{ right: switchedControl ? "260px" : "10px" }} className='layer-button' >
              <Popover placement="leftTop" title={"Select Base Map"} content={content}>
                <img width="24" height="24" src="https://img.icons8.com/glassmorphism/48/experimental-map-marker-glassmorphism.png" alt="experimental-map-marker-glassmorphism" />
              </Popover>
            </div>
            <div style={{ right: switchedControl ? "260px" : "10px" }} className='layer-button-2' >
              <Popover placement="leftTop" title={"Select Map Layer"} content={<BuildLayer setLayerState={setLayerState} layerState={layerState} />}>
                <img
                  width="24" height="24"
                  src="https://img.icons8.com/fluency/48/layers.png"
                  alt="layers" />
              </Popover>
            </div>
            <div style={{ right: switchedControl ? "260px" : "10px" }} className='layer-button-3' >
              <img className='zoom-out-button' onClick={() => setZoom(zoom - 0.5)} width="30" height="30" src="https://img.icons8.com/fluency/48/zoom-out.png" alt="zoom-out" />
              <img className='zoom-in-button' onClick={() => setZoom(zoom + 0.5)} width="30" height="30" src="https://img.icons8.com/fluency/48/zoom-in--v1.png" alt="zoom-in--v1" />
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
            <div style={{ position: "relative" }} className="section-bottom">
              <RightBottom />
            </div>
            <div className="section-bottom">
              <LeftBottom />
            </div>
            <div className="section-bottom">
              <MiddleLeftBottom />
            </div>
            <div className="section-bottom">
              <MiddleBottomEducation />
            </div>
            <div className="section-bottom">
              <MiddleBottomMosque />
            </div>
            <div className="section-bottom">
              <BottomMiddleTransport />
            </div>
            <div className="section-bottom">
              <MiddleRightBottom />
            </div>
            <div className="section-bottom">
              <MiddleBottomInterest />
            </div>
            <div className="section-bottom">
              <BottomMiddleIndustry />
            </div>
            <div className="section-bottom">
              <BottomMiddleIndustry />
            </div>
          </div>
        </div>
        <div style={{ display: "none" }} className='bottom-mobile' >
          <div style={{ position: "relative" }} className="section-bottom-mobile">
            <RightBottom />
          </div>
          <div className="section-bottom-mobile">
            <LeftBottom />
          </div>
          <div className="section-bottom-mobile">
            <MiddleLeftBottom />
          </div>
          <div className="section-bottom-mobile">
            <MiddleBottomEducation />
          </div>
          <div className="section-bottom-mobile">
            <MiddleBottomMosque />
          </div>
          <div className="section-bottom-mobile">
            <BottomMiddleTransport />
          </div>
          <div className="section-bottom-mobile">
            <MiddleRightBottom />
          </div>
        </div>
        <div>


        </div>
      </div>
      <div className='bottom-bar'>
        <BottomBar
          switchRef={switchRef}
          setSwitchedControl={setSwitchedControl}
          hoveredCoordinates={hoveredCoordinates} />
      </div>
    </div>

  );
}

export default App;