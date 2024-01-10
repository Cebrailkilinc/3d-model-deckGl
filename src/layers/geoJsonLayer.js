// geoUtils.js

import { GeoJsonLayer } from 'deck.gl';

export const createGeoJsonLayer = (id, data, color, setClickedType, setAllData, setBuildingId, dispatch, addPropertiesData, setColor) => {
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
      const value = object.properties;
      if (value === color) {
        return [205, 204, 34]; // Tıklanıldığı andakli renk #kırmızı    
      } else {
        return [255, 0, 0]; // Beyaz
      }
    },
    updateTriggers: {
      getFillColor: [color],
    },
    getLineColor: [255, 255, 255],
    pickable: true,
    onClick: (e) => {
      handleBuildProperties(e, setClickedType, setAllData, setBuildingId, dispatch, addPropertiesData, setColor);
    },
  });
};
