import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core';
import { scaleThreshold } from 'd3-scale';
import datas from "../data/municipalities.json"
import datas2 from "./output3.json"
import datas3 from "./bina3D_4326.json"
import datas4 from "./output6.json"
import bagimsiz from "./bagimsizBolum.json"
import kapi from "./kapi.json"
import parsel3d from "./parsel3D.json"
import ekYapi from "./EkYapi3D.json"
import yol from "./yol.json"
import bina2BCatidan from "./Bina_2B_Catidan.json"
import mapStyle from "./mapStyle.json"


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

    //{ "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[-123.0713722, 37.2720583], [-123.0697150, 49.2720458], [-123.0697259, 49.2715034], [-123.0713824, 49.2715159], [-123.0713722, 49.2720583]]] }, "properties": { "valuePerSqm": 2270, "growth": 0.2653 } }
  ],

}
datas2.features.map(main => DATA_URL.features.push(main))
console.log(DATA_URL)

const token = "pk.eyJ1IjoiYWJkdWxsYWh1Z3VyIiwiYSI6ImNqcHRnaDgxbDA1dWo0NXF3NDIzenFtcGIifQ.64t6cmzJ79MTvJzQNjShMA"

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

const MAP_STYLE = "mapbox://styles/mapbox/dark-v9";

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

export default function App({ data = [bagimsiz, datas4, kapi, parsel3d, ekYapi, yol, bina2BCatidan], mapStyle = MAP_STYLE }) {
  const [effects] = useState(() => {
    const lightingEffect = new LightingEffect({ ambientLight, dirLight });
    lightingEffect.shadowColor = [0, 0, 0, 0.5];
    return [lightingEffect];
  });

  const layers = [
    // only needed when using shadows - a plane for shadows to drop on
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [0, 0, 0, 0],
    }),

    new GeoJsonLayer({
      id: 'geojson',
      data: data[0],
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [240, 255, 255],
      pickable: true
    }),

    new GeoJsonLayer({
      id: 'geojson',
      data: data[2],
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [255, 255, 255],
      pickable: true
    }),
    new GeoJsonLayer({
      id: 'geojson',
      data: data[1],
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [255, 255, 255],
      pickable: true
    }),

    new GeoJsonLayer({
      id: 'geojson',
      data: data[3],
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [255, 255, 255],
      pickable: true
    }),
    new GeoJsonLayer({
      id: 'geojson',
      data: data[4],
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [255, 255, 255],
      pickable: true
    }),
    new GeoJsonLayer({
      id: 'geojson',
      data: data[5],
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => COLOR_SCALE(f.properties.growth),
      getLineColor: [255, 255, 255],
      pickable: true
    }),
  ];

  return (
    <DeckGL
      layers={layers}
      effects={effects}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      <JsonLayer />
      <Map reuseMaps mapLib={maplibregl} mapStyle={`https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json`} preventStyleDiffing={true} />
    </DeckGL>
  );
}

