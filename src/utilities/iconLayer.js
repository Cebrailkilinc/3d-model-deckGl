import {  IconLayer } from '@deck.gl/layers';
export const iconLayer = (data) => {
  return  new IconLayer({
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
}