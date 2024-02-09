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






const RightBottom = () => {

    const [center, setCenter] = useState({lat:0, long:0})
    const INITIAL_VIEW_STATE = {
        latitude: center.lat,
        longitude: center.long,
        zoom: 19,
        maxZoom: 20,
        pitch: 45,
        bearing: 0
    };
    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)

    console.log(data)

    const itemWithId8 = data.features.find(item => item.properties.GBB_Id === bagimsizBolum.GBB_Id);

    if (itemWithId8) {
        console.log("ID'si 8 olan öğe bulundu:", itemWithId8);
    } else {
        console.log("ID'si 8 olan bir öğe bulunamadı.");
    }
    useEffect(()=>{
        setCenter(prevState => ({
            ...prevState,
            lat:itemWithId8?.geometry?.coordinates[0][0][0][1],
            long:itemWithId8?.geometry?.coordinates[0][0][0][0],
          }));
    },[itemWithId8])

   console.log(center)

    const [effects] = useState(() => {
        const lightingEffect = new LightingEffect({ ambientLight, dirLight });
        lightingEffect.shadowColor = [0, 0, 0, 0.5];
        return [lightingEffect];
    });

    const layers = [
        // only needed when using shadows - a plane for shadows to drop on
        new PolygonLayer({
            id: 'ground',
            data: itemWithId8,
            stroked: false,
            getPolygon: f => f,
            getFillColor: [0, 0, 0, 0]
        }),
        new GeoJsonLayer({
            id: 'geojson',
            data: [itemWithId8],
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
        <div >
            <DeckGL
                layers={layers}
                effects={effects}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                style={{ width: "100%", height: "290px", zIndex: "0" }}
                className="map-layer-area"
                id="mini-map"
            >
            </DeckGL>
        </div>
    )
}

export default RightBottom