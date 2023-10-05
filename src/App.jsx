import React, { Suspense, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Source, Layer } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers';
import { LightingEffect, AmbientLight, _SunLight as SunLight, PointLight, DirectionalLight, OrbitView } from '@deck.gl/core';
import { useSelector, useDispatch } from 'react-redux'
import { addPropertiesData } from './redux/slices/propertiesSlice';
import Sidebar from './layout/sidebar/Sidebar';
import Navbar from './layout/navbar/Navbar';
import Properties from './layout/properties/Properties';
import LayerModal from './components/LayerModal';
import getTooltip from './utilities/geoTooltip';
import { landCover } from './utilities/landCover';
import Loading from './components/Loading';
import BottomBar from './layout/bottombar/BottomBar';
import mapboxgl from 'mapbox-gl';





const INITIAL_VIEW_STATE = {
  latitude: 40.649687967664747,
  longitude: 35.809093508628486,
  zoom: 15,
  maxZoom: 20,
  pitch: 45,
  bearing: 0
};
const data = [
  {
    position: [-74.006, 40.7128, 0], // New York City'nin koordinatları: boylam, enlem, yükseklik
    radius: 1000, // Noktanın yarıçapı (metre cinsinden)
  },
  // Add more points as needed
];


function App() {

  const [color, setColor] = useState("")
  const [hoveredCoordinates, setHoveredCoordinates] = useState({ lat: 0, long: 0 });


  const count = useSelector((state) => state.counter.value)
  const spinControl = useSelector((state) => state.modalControl.spinControl)
  const dispatch = useDispatch();

  const view = new OrbitView({ id: '3d-scene', controller: true });

  const handleMapHover = (event) => {
    if (event.coordinate && event.coordinate.length >= 2) {
      setHoveredCoordinates({
        lat: event.coordinate[0],
        long: event.coordinate[1]
      });
    }
  }
  const handleBuildProperties = (e) => {
    const clickedObject = e.object;
    console.log(e)
    if (clickedObject) {
      console.log(clickedObject);
      dispatch(addPropertiesData(clickedObject))
      setColor(clickedObject.properties)
    } else {
      console.log("unclickedObjec")
    }
  }

  const date = new Date();
  const sunlightEffect = new LightingEffect({
    ambientLight: new AmbientLight({
      color: [255, 255, 255],
      intensity: 1.0
    }),

    dirLight: new SunLight({
      timestamp: Date.UTC(2023, 7, 1, 10),  //Güneş pozisyonunu ayarlayın    
      color: [255, 255, 255],
      intensity: 2,
      position: [0, 0, 100], // Sahnenin üzerinde bir konumda
      direction: [0, -1, -1],
      _shadow: true

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


  const layers = [
    // only needed when using shadows - a plane for shadows to drop on
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      stroked: false,
      getPolygon: f => f,
      getFillColor: [0, 0, 0, 0],
    }),
    ...count.map((geojsonData, index) => createGeoJsonLayer(`geojson${index + 1}`, geojsonData)),

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
            OrbitView={view}
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