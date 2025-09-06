const readLocal = (name: string, def = 0) => {
   const p = localStorage.getItem(name);
   return p ? +p : def;
};

let longitude = 0;
export const getLongitude = () =>
   longitude || (longitude = readLocal('_longitude'));
export const setLongitude = (p: number) =>
   localStorage.setItem('_longitude', (longitude = p).toString());

let latitude = 0;
export const getLatitude = () =>
   latitude || (latitude = readLocal('_latitude'));
export const setLatitude = (p: number) =>
   localStorage.setItem('_latitude', (latitude = p).toString());

let altitude = 0;
export const getAltitude = () =>
   altitude || (altitude = readLocal('_altitude'));
export const setAltitude = (p: number) =>
   localStorage.setItem('_altitude', (altitude = p).toString());
