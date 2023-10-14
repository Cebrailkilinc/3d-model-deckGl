import { GeoJsonLayer } from '@deck.gl/layers';
export const createGeoJsonLayer = (id, data, handleBuildProperties,color) => {
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