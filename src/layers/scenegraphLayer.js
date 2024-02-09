export const scenegraphLayer = (handleDragStart, handleDragStop, modalPosition, data2) => {
    return new ScenegraphLayer({
        id: 'scenegraph-layer',
        data: data2,
        pickable: true,
        scenegraph: 'Hotel.glb',
        getPosition: d => d.coordinates,
        getOrientation: d => [modalPosition.x, modalPosition.y, modalPosition.z],
        sizeScale: modalPosition.size,
        _lighting: 'pbr',
        onDrag: handleDragStart,
        onDragEnd: handleDragStop,
        _animations: true
    })
}