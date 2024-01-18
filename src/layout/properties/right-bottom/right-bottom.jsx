import React, { useEffect } from 'react';
import "./rightbottom.css"
import { useSelector } from 'react-redux'
import { DeckGL } from 'deck.gl'
import { Map } from 'react-map-gl'
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import daire from "../../../../data/new/daire.json"



const RightBottom = () => {
    const { mimariBina, bagimsizBolum, parsel } = useSelector(state => state.properties)


    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWJkdWxsYWh1Z3VyIiwiYSI6ImNqcHRnaDgxbDA1dWo0NXF3NDIzenFtcGIifQ.64t6cmzJ79MTvJzQNjShMA';

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.006, 40.7128],
            zoom: 15,
            pitch: 45, // 3D eğim açısı
            bearing: -17.6, // Kuzey yönlü açı
        });

        // 3D bina modeli ekleyin
        map.on('load', () => {

            map.addSource('3d-buildings', {
                type: 'geojson',
                data: daire, // GeoJSON dosyasının yolu
            }),
            map.addLayer({
                id: 'geojson-layer',
                type: 'fill',
                source: 'geojson-data',
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.8,
                },
            });
        });
    

        // React component will unmount
        return () => map.remove();
    }, []);
    return (
        <div style={{ width: "100%", height: "200px" }} id="map" className='left-bottom'>

        </div>
    )
}

export default RightBottom