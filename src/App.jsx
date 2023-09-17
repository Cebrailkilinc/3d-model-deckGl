import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core';
import { scaleThreshold } from 'd3-scale';
import bina3D from "../data/bina3D.json"
import bagimsiz from "../data/bagimsizBolum.json"
import kapi from "../data/kapi.json"
import parsel3d from "../data/parsel3D.json"
import ekYapi from "../data/EkYapi3D.json"
import yol from "../data/yol.json"
import bina2BCatidan from "../data/Bina_2B_Catidan.json";
import Uploads from './components/Uploads';
import backendBina from "../data/backenBina.json";
import { useSelector, useDispatch } from 'react-redux'

// Source data GeoJSON
const DATA_URL =
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [[-123.0249569, 49.2407190],
          [-123.0241582, 49.2407165],
          [-123.0240445, 49.2406847],
          [-123.0239311, 49.2407159],
          [-123.0238530, 49.2407157],
          [-123.0238536, 49.2404548],
          [-123.0249568, 49.2404582],
          [-123.0249569, 49.2407190]]
        ]
      },
      "properties": { "valuePerSqm": 4563, "growth": 0.3592 }
    },
    
  ],

}

export const COLOR_SCALE = scaleThreshold()
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

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

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
  <div>${object.properties.valuePerParcel} / parcel</div>
  <div>${object.properties.valuePerSqm} / m<sup>2</sup></div>
  <div><b>Growth</b></div>
  <div>${Math.round(object.properties.growth * 100)}%</div>
  `
    }
  );
}

function App({ mapStyle = MAP_STYLE }) 
{
  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
});
const data = []
const count = useSelector((state) => state.counter.value)
const dispatch = useDispatch()
data.push(count)
console.log(count)



const createGeoJsonLayer = (id, data) => {
  return new GeoJsonLayer({
    id: id,
    data:data,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
    getFillColor: f => COLOR_SCALE(f.properties.growth),
    getLineColor: [232,36,30],
    pickable: true
  });
};

  const layers = [
    // only needed when using shadows - a plane for shadows to drop on
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [232,36,30, 0],
    }),
    new GeoJsonLayer({
      id: 1,
      data:count ,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [232,36,30],
      pickable: true
    })

    //...data.map((geojsonData, index) => createGeoJsonLayer(`geojson${index + 1}`, geojsonData)),

    // new GeoJsonLayer({
    //   id: 'geojson',
    //   data: data[0],
    //   opacity: 0.8,
    //   stroked: false,
    //   filled: true,
    //   extruded: true,
    //   wireframe: true,
    //   getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
    //   getFillColor: f => COLOR_SCALE(f.properties.growth),
    //   getLineColor: [240, 255, 255],
    //   pickable: true
    // }),
   
  ];

  return (
    <DeckGL
      layers={layers}
      effects={effects}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >  
     <Uploads/>
      <Map mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} reuseMaps mapStyle={"mapbox://styles/mapbox/satellite-v9"} preventStyleDiffing={true} />
     
    </DeckGL>
  );
}

export default App;