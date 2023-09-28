import React, { Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core';
import { scaleThreshold } from 'd3-scale';
import { Layout, Space } from 'antd';



import { useSelector, useDispatch } from 'react-redux'
import { addPropertiesData } from './redux/slices/propertiesSlice';
import Sidebar from './layout/sidebar/Sidebar';
import Navbar from './layout/navbar/Navbar';
import Properties from './layout/properties/Properties';

const COLOR_SCALE = scaleThreshold()
  .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
  .range([
    [65, 182, 196],
    [127, 205, 187],
    [199, 233, 180],
    [237, 248, 177],
    // zero
    [255, 255, 204],
    [255, 237, 160],
    [254, 217, 118],
    [254, 178, 76],
    [253, 141, 60],
    [252, 78, 42],
    [227, 26, 28],
    [189, 0, 38],
    [128, 0, 38]
  ]);

const INITIAL_VIEW_STATE = {
  latitude: 40.649687967664747,
  longitude: 35.809093508628486,
  zoom: 15,
  maxZoom: 20,
  pitch: 45,
  bearing: 0
};


const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 22),
  color: [255, 255, 255],
  intensity: 1.0,
  _shadow: true
});

const landCover = [
  [
    [-123.0, 49.196],
    [-123.0, 49.324],
    [-123.306, 49.324],
    [-123.306, 49.196]
  ]
];

function getTooltip({ object }) {
  return (
    object && {
      html: `\
  <div><b>Average Property Value</b></div>
  <div>${object.properties} / parcel</div>
  <div>${object.properties} / m<sup>2</sup></div>
  <div><b>Growth</b></div>
  <div>${Math.round(object.properties.growth * 100)}%</div>
  `
    }
  );
}


function App() {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();

  const [color, setColor] = useState("")

  const handleBuildProperties = (e) => {
    const clickedObject = e.object;
    console.log(e)
    if (clickedObject) {
      console.log(clickedObject);
      dispatch(addPropertiesData(clickedObject))
      setColor(clickedObject.properties.GBB_Id)     
    } else {
      console.log("unclickedObjec")
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
      getFillColor: (object, index) => {
        // object ile çalışarak, öğenin özelliklerine erişebilir ve rengini belirleyebilirsiniz.
        const value = object.properties.MB_ID || object.properties.GBB_Id // Örnek bir özellik
        if (value === color) {
          return [255,255,0]; // sarı renk       
        } else {
          return [173,255,47]; // Mavi renk
        }
      }, // Rengi seçilen nesneye göre değiştir
      updateTriggers: {
        getFillColor: [color],
        getLineColor: [color], // count değeri değiştiğinde renk güncellemesini tetikle
      },
      getLineColor: (object, index) => {
        // object ile çalışarak, öğenin özelliklerine erişebilir ve rengini belirleyebilirsiniz.
        const value = object.properties.GBB_Id; // Örnek bir özellik
        if (value === color) {
          return [255,255,224]; //      
        } else {
          return [220,20,60]; // Kırmızı renk  
        }
      }, // Rengi seçilen nesneye göre değiştir
      pickable: true,
      onClick: (e) => { handleBuildProperties(e) },
   
    });
  };

  const layers = [
    // only needed when using shadows - a plane for shadows to drop on
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [232, 36, 30, 0],
    }),
    ...count.map((geojsonData, index) => createGeoJsonLayer(`geojson${index + 1}`, geojsonData)),

  ];

  return (

    <div className='map-container'  >
      <div>
        <Navbar />
      </div>
      <div >
        <Sidebar />
      </div>
      <div>
        <Properties />
      </div>
      <div style={{ position: "fixed", width: '100%', height: '100%' }}>
        {
          <DeckGL

            layers={layers}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            getTooltip={getTooltip}
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