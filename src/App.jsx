import React, { Suspense, useState, useEffect } from 'react';
import { MdLocationPin } from "react-icons/md"

//Geograpich layers
import Map, { Source, Layer } from 'react-map-gl';
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
import Sidebar from './layout/sidebar/Sidebar';
import Navbar from './layout/navbar/Navbar';
import Properties from './layout/properties/Properties';
import LayerModal from './components/LayerModal';
import Loading from './components/Loading';
import BottomBar from './layout/bottombar/BottomBar';

//Utilities
import { landCover } from './utilities/landCover';

import iconss from "./assets/icon.png"

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
 //CEBRAİL KILINÇ
  const [color, setColor] = useState("")
  const [hoveredCoordinates, setHoveredCoordinates] = useState({ lat: 0, long: 0 });
  const [buildingCenterCoordinate, setBuildingCenterCoordinate] = useState({ latitude: 0, longitude: 0 });
  const [sunPosition, setSunPosition] = useState({ azimuth: 0, altitude: 0 });
  //Redux-states
  const count = useSelector((state) => state.counter.value)
  const spinControl = useSelector((state) => state.modalControl.spinControl)
  const dispatch = useDispatch();

  //Created new date
  const date = new Date();

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
      console.log(clickedObject);
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
          return [139, 101, 139]; // sarı renk       
        } else {
          return [255, 255, 255]; //beyaz
        }
      }, // Rengi seçilen nesneye göre değiştir
      updateTriggers: {
        getFillColor: [color],
        // count değeri değiştiğinde renk güncellemesini tetikle
      },
      getLineColor: [248, 248, 255],
      // object ile çalışarak, öğenin özelliklerine erişebilir ve rengini belirleyebilirsiniz.
      pickable: true,
      onClick: (e) => { handleBuildProperties(e) },
    });
  };

  const data = [
    { name: 'Colma (COLM)', address: '365 D Street, Colma CA 94014', exits: 4214, coordinates: [35.81, 40.65] }]

  //all layers are collected here
  const layers = [
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [0, 0, 0, 0],
    }),
    ...count.map((geojsonData, index) => createGeoJsonLayer(`geojson${index + 1}`, geojsonData)),
    new ScatterplotLayer({
      data: [{ position: [35.81, 40.65], color: [255, 0, 0, 128], radius: 100 }],       
      getFillColor: d => d.color,
      getRadius: d => d.radius
    }),

    new IconLayer({
      id: 'IconLayer',
      data,
      // alphaCutoff: 0.05,
      // billboard: true,
      // getAngle: 0,
      getColor: d => [Math.sqrt(d.exits), 140, 0],
      getIcon: d => 'marker',
      // getPixelOffset: [0, 0],
      getPosition: d => d.coordinates,
      getSize: d => 5,
      iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: {
        marker: {
          x: 0,
          y: 0,
          width: 128,
          height: 128,
          anchorY: 128,
          mask: true
        }
      },
      // onIconError: null,
      // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
      // sizeMinPixels: 0,
      sizeScale: 8,
      // sizeUnits: 'pixels',
      // textureParameters: null,

      /* props inherited from Layer class */

      // autoHighlight: false,
      // coordinateOrigin: [0, 0, 0],
      // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      // highlightColor: [0, 0, 128, 128],
      // modelMatrix: null,
      // opacity: 1,
      pickable: true,
      // visible: true,
      // wrapLongitude: false,
    })


  ];

  return (

    <div className='map-container'  >
      {spinControl ? <Loading /> : null}
      <LayerModal />
      <div>
        <BottomBar hoveredCoordinates={hoveredCoordinates} />
      </div>
      <div>
        <Navbar />
      </div>
      <div >
        <Sidebar count={count} />
      </div>
      <div>
        <Properties />
      </div>
      <div style={{ position: "fixed", width: '100%', height: '100%' }}>
        {
          <DeckGL
            onHover={handleMapHover}
            layers={layers}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            effects={[sunlightEffect]}
            onError={(err) => {
              console.log("Deck_ERROR", err); // not triggered
            }}
          >
            <Map style={{ width: 600, height: 400, zIndex: "2" }} mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} reuseMaps mapStyle={"mapbox://styles/mapbox/satellite-v9"} preventStyleDiffing={true} />
          </DeckGL>
        }

      </div>
    </div>
  );
}

export default App;