import React, { Suspense, useState, useEffect } from 'react';
import { MdLocationPin } from "react-icons/md"

import "./styles/container.css"
import "mapbox-gl/dist/mapbox-gl.css";

//Geograpich layers
import Map, { Source, Layer, useControl } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer, ScatterplotLayer, IconLayer } from '@deck.gl/layers';

import {
  LightingEffect,
  AmbientLight,
  _SunLight as SunLight,
  OrbitView,
  PointLight,

} from '@deck.gl/core';
import SunCalc from 'suncalc';
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { addPropertiesData } from './redux/slices/propertiesSlice';

//Components

import Navbar from './layout/navbar/Navbar';
import LayerModal from './components/LayerModal';
import BottomBar from './layout/bottombar/BottomBar';

//Utilities
import { landCover } from './utilities/landCover';

//import datas
import bagimsizBolum from "../data/new/bagimsizBolum.json"
import bina3D from "../data/new/bina3D.json"
import kapiGirisi from "../data/new/kapiGirisi.json"
import yol from "../data/new/yol.json"
import parsel2d from "../data/new/parsel2d.json"
import parsel3d from "../data/new/parsel3d.json"
import ekYapi from "../data/new/ekYapi.json"




const INITIAL_VIEW_STATE = {
  latitude: 40.649687967664747,
  longitude: 35.809093508628486,
  zoom: 15,
  maxZoom: 20,
  pitch: 45,
  bearing: 0
};

const ICON_MAPPING = {
  marker: { width: 8, height: 8 }
};

function App() {

  const [color, setColor] = useState("")
  const [hoveredCoordinates, setHoveredCoordinates] = useState({ lat: 0, long: 0 });
  const [buildingCenterCoordinate, setBuildingCenterCoordinate] = useState({ latitude: 0, longitude: 0 });
  const [sunPosition, setSunPosition] = useState({ azimuth: 0, altitude: 0 });
  const [buildingId, setBuildingId] = useState({ binaId: "", katId: "", parselId: "" });
  const [clickedType, setClickedType] = useState("")
  const [allData, setAllData] = useState(
    {
      bagimsizBolum: null,
      parselOzellikleri: null,
      binaOzellkleri: null,
    })

  const [mapSize, setMapSize] = useState({ width: '50%', height: '60%' });

  //Redux-states
  const dispatch = useDispatch();

  //Created new date
  const date = new Date();
  useEffect(() => {
    // Event listener ekleyerek tarayıcı penceresi boyutu değiştiğinde mapSize'ı güncelle
    const handleResize = () => {
      setMapSize({
        width: window.innerWidth > 1920 ? '50%' : '40%', // Örnekte 768 pikselin altında tamamen responsive olması için
        height: window.innerWidth > 1920 ? '60%' : '40%',
      });
    };
    return () => {
      window.removeEventListener('resize', handleResize());
    };
  }, []);



  //Properties related to the current date are called
  const sunDataProperties = SunCalc.getTimes(/*Date*/ date, buildingCenterCoordinate.long, buildingCenterCoordinate.lat, /*Number (default=0)*/ 500)


  //Position sun related current date are called
  const getSunPosition = SunCalc.getPosition(date, buildingCenterCoordinate.long, buildingCenterCoordinate.lat);

  //Calculate sun position  
  const earthRadius = 6371; // Dünya'nın yarıçapı (km)
  const x = earthRadius * Math.cos(getSunPosition.altitude) * Math.cos(getSunPosition.azimuth);
  const y = earthRadius * Math.cos(getSunPosition.altitude) * Math.sin(getSunPosition.azimuth);
  const z = earthRadius * Math.sin(getSunPosition.altitude);


  const year = date.getFullYear().toString().slice(-4); // Yılın son iki rakamını alır
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ayı alır ve gerekirse sıfır ile doldurur
  const day = date.getDate().toString().padStart(2, '0'); // Günü alır ve gerekirse sıfır ile doldurur


  const parselOfBuilding = [];
  const bagimsizOfBuilding = [];

  useEffect(() => {

    if (clickedType === "MimariBina") {
      const filteredBagimsizBolum = bagimsizBolum.features.filter((item) => item.properties.gml_pare_1 === buildingId.binaId);
      const filteredParsel2d = parsel2d.features.filter((item) => item.properties.parselNo === buildingId.parselId);

      setAllData((prev) => ({
        ...prev,
        bagimsizBolum: filteredBagimsizBolum.map((item) => item.properties),
        parselOzellikleri: filteredParsel2d.length > 0 ? filteredParsel2d[0].properties : null,
      }));
    }
  }, [buildingId.binaId, buildingId.parselId, buildingId.katId]);


  // Get coordinate data
  const handleMapHover = (event) => {
    if (event.coordinate && event.coordinate.length >= 2) {
      setHoveredCoordinates({
        lat: event.coordinate[0],
        long: event.coordinate[1]
      });
    }
  }

  //Get properties data from file 
  const handleBuildProperties = (e) => {
    const clickedObject = e.object;
    if (clickedObject) {

      if (clickedObject.properties._3 && clickedObject.properties._3 === "MimariBina") {
        setClickedType("MimariBina")
        setAllData((prev) => ({ ...prev, binaOzellkleri: clickedObject.properties }))
        setBuildingId((prev) => ({ ...prev, parselId: clickedObject.properties.parcelNo }))

      }
      if (clickedObject.properties._5 && clickedObject.properties._5 === "BagimsizBolum") {
        setClickedType("BagimsizBolum")
      }
      if (clickedObject.properties._5 && clickedObject.properties._5 === "Balkon") {
        setClickedType("Balkon")
      }

      setBuildingId((prevBuildingId) => ({
        ...prevBuildingId,
        binaId: clickedObject.properties.MB_ID,
        parselId: clickedObject.properties.parcelNo
      }));

      dispatch(addPropertiesData(clickedObject))
      setColor(clickedObject.properties)
      const buildingCenter = { lat: e.coordinate[1], long: e.coordinate[0] }
      setBuildingCenterCoordinate(buildingCenter)
    } else {
      console.log("unclickedObjec")
    }
  }


  //Sunlight effect and shadow for building
  const sunlightEffect = new LightingEffect({
    ambientLight: new AmbientLight({
      color: [255, 255, 255],
      intensity: 1.0
    }),
    dirLight: new SunLight({
      timestamp: Date.UTC(year, month, day, 12),  //Güneş pozisyonunu ayarlayın    
      color: [255, 255, 255],
      intensity: 2,
      position: [x, y, z], // Sahnenin üzerinde bir konumda
      direction: [x, y, -z],
      _shadow: true,
    }),

  });

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
      onClick: (e) => { handleBuildProperties(e) },
    });
  };

  const data = [
    { name: 'Colma (COLM)', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [35.81, 40.65] }]

  const datas = [bina3D, bagimsizBolum, kapiGirisi, yol, parsel2d, ekYapi]
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
    // // new ScatterplotLayer({
    // //   data: [{ position: [35.81, 40.65], color: [255, 0, 0, 128], radius: 100 }],
    // //   getFillColor: d => d.color,
    // //   getRadius: d => d.radius
    // // }),

    // // new IconLayer({
    // //   id: 'IconLayer',
    // //   data,
    // //   // alphaCutoff: 0.05,
    // //   // billboard: true,
    // //   // getAngle: 0,
    // //   getColor: d => [Math.sqrt(d.exits), 140, 0],
    // //   getIcon: d => 'marker',
    // //   // getPixelOffset: [0, 0],
    // //   getPosition: d => d.coordinates,
    // //   getSize: d => 5,
    // //   iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    // //   iconMapping: {
    // //     marker: {
    // //       x: 0,
    // //       y: 0,
    // //       width: 128,
    // //       height: 128,
    // //       anchorY: 128,
    // //       mask: true
    // //     }
    // //   },
    // //   // onIconError: null,
    // //   // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
    // //   // sizeMinPixels: 0,
    // //   sizeScale: 8,
    // //   // sizeUnits: 'pixels',
    // //   // textureParameters: null,

    // //   /* props inherited from Layer class */

    // //   // autoHighlight: false,
    // //   // coordinateOrigin: [0, 0, 0],
    // //   // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    // //   // highlightColor: [0, 0, 128, 128],
    // //   // modelMatrix: null,
    // //   // opacity: 1,
    // //   pickable: true,
    // //   // visible: true,
    // //   // wrapLongitude: false,
    // // })


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
        <div className="section">
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
            <img className='button' width="24" height="24" src="https://img.icons8.com/fluency/48/layers.png" alt="layers" />
            <Map
              mapLib={import('mapbox-gl')}
              initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
              }} 
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} reuseMaps mapStyle={"mapbox://styles/mapbox/satellite-v9"} preventStyleDiffing={true} />
          </DeckGL>
        </div>
        <div style={{ display: "block" }} className='menu-content' >
          <div className="section-top-left">
            Sol üst Bar
          </div>
          <div className="section-top-right">
            Sağ üst Bar
          </div>
          <div className='bottom' >
            <div className="section-bottom">
              Sağ Bar1
            </div>
            <div className="section-bottom">
              Sağ Bar2
            </div>
            <div className="section-bottom">
              Sağ Bar3
            </div>
            <div className="section-bottom">
              Sağ Bar4
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-bar'>
        <BottomBar hoveredCoordinates={hoveredCoordinates} />
      </div>

    </div>

  );
}

export default App;