// functions.js

export const handleBuildProperties = (e, setClickedType, setAllData, setBuildingId, dispatch, addPropertiesData, setColor) => {
    const clickedObject = e.object;
  
    const setBuildingData = (type, data) => {
      setClickedType(type);
      setAllData((prev) => ({ ...prev, binaOzellkleri: data.properties }));
      setBuildingId((prev) => ({
        ...prev,
        parselId: data.properties.parcelNo,
        binaId: data.properties.MB_ID,
      }));
    };

    console.log(clickedObject)

     
    if (clickedObject) {
      if (clickedObject.properties._3 && clickedObject.properties._3 === "MimariBina") {
        setBuildingData("MimariBina", clickedObject);
      } else if (clickedObject.properties._5 && clickedObject.properties._5 === "BagimsizBolum") {
        setClickedType("BagimsizBolum");
      } else if (clickedObject.properties._5 && clickedObject.properties._5 === "Balkon") {
        setClickedType("Balkon");
      } else if (clickedObject.properties.PARCELID) {
        setClickedType("parcel");
      } else {
        setClickedType("yol");
      }
  
      dispatch(addPropertiesData(clickedObject));
      setColor(clickedObject.properties);
    } else {
      console.log("unclickedObject");
    }
  };
  