import React, { useEffect, useState } from 'react';
import "./rightbottom.css"
import { useSelector } from 'react-redux'
import 'mapbox-gl/dist/mapbox-gl.css';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core';
import { scaleThreshold } from 'd3-scale';
import data from "../../../../data/new/bagimsizBolum.json"



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
    latitude: 40.64964,
    longitude: 35.80915,
    zoom: 19,
    maxZoom: 20,
    pitch: 45,
    bearing: 0
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

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



const RightBottom = () => {
    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)
   
    const [effects] = useState(() => {
        const lightingEffect = new LightingEffect({ ambientLight, dirLight });
        lightingEffect.shadowColor = [0, 0, 0, 0.5];
        return [lightingEffect];
    });

    const layers = [
        // only needed when using shadows - a plane for shadows to drop on
        new PolygonLayer({
            id: 'ground',
            data: data.features[0],
            stroked: false,
            getPolygon: f => f,
            getFillColor: [0, 0, 0, 0]
        }),
        new GeoJsonLayer({
            id: 'geojson',
            data: data.features[0],
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
            getFillColor: f => COLOR_SCALE(f.properties.growth),
            getLineColor: [255, 255, 255],
            pickable: true
        })
    ];



    return (
        <div style={{position:"absolute", top:"0px", left:"0px"}} >
           <DeckGL
                layers={layers}
                effects={effects}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}              
                style={{ width: "180px", height: "150px", backroundColor:"red", zIndex:"0"}}
                className="map-layer-area"
                id="mini-map"
            >             
            </DeckGL> 


        </div>
    )
}

export default RightBottom