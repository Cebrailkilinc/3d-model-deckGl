import SunCalc from 'suncalc';

export const calculateShadowDuration = (building1, building2) => {
  // İki bina arasındaki mesafeyi ve açıyı hesapla
  const distance = Math.sqrt(
    Math.pow(building1.longitude - building2.longitude, 2) +
    Math.pow(building1.latitude - building2.latitude, 2)
  );

  const angle = Math.atan2(building2.latitude - building1.latitude, building2.longitude - building1.longitude);

  // Güneşin doğuş ve batış saatlerini al
  const times = SunCalc.getTimes(new Date(), building1.latitude, building1.longitude);

  // Güneşin doğuş ve batış saatleri arasında bina2'nin gölgesinin bina1 üzerinde kalma süresini hesapla
  const sunrise = times.sunrise.getTime();
  const sunset = times.sunset.getTime();
  let shadowDuration = 0;

  for (let time = sunrise; time < sunset; time += 60000) {
    const sunPosition = SunCalc.getPosition(new Date(time), building1.latitude, building1.longitude);
    const shadowPosition = SunCalc.getPosition(new Date(time), building2.latitude, building2.longitude);

    // Güneş ve gölge pozisyonları arasındaki açıyı kontrol et
    const angleDiff = Math.abs(sunPosition.azimuth - shadowPosition.azimuth);
    if (angleDiff < Math.PI / 2 && sunPosition.altitude > 0) {
      // Eğer güneş, gölgenin üzerindeyse ve gün ışığı varsa, gölge süresini arttır
      shadowDuration += 1;
    }
  }

  // Gölge süresini dakika cinsinden döndür
  return shadowDuration;
};

