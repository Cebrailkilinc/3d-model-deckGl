
export const handleBuildProperties = (e,
  setClickedType,
  setAllData,
  setBuildingId,
  dispatch,
  addMimariBina,
  addBagimsizBolum,
  addBalkon,
  addParsel,
  addYol,
  setColor) => {
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


  if (clickedObject) {
    if (clickedObject.properties._3 && clickedObject.properties._3 === "MimariBina") {
      console.log(clickedObject)
      setBuildingData("MimariBina", clickedObject);
      dispatch(addMimariBina(clickedObject.properties))

    } else if (clickedObject.properties._5 && clickedObject.properties._5 === "BagimsizBolum") {

      setClickedType("BagimsizBolum");
      dispatch(addBagimsizBolum(clickedObject.properties))

    } else if (clickedObject.properties._5 && clickedObject.properties._5 === "Balkon") {
      console.log(clickedObject)
      setClickedType("Balkon");
    } else if (clickedObject.properties.PARCELID) {
      setClickedType("parsel");
      console.log(clickedObject)
      dispatch(addParsel(clickedObject.properties))
    } else {
      setClickedType("yol");
    }

    console.log(clickedObject)

    setColor(clickedObject.properties);
  } else {
    console.log("unclickedObject");
  }
};
