let longitude = 0;
export const getLongitude = () => {
    if (longitude != 0) return longitude;
    const l = localStorage.getItem('_longitude');
    return l ? +l : 0;
}
export const setLongitude = (l: number) => localStorage.setItem('_longitude', (longitude = l).toString());

let latitude = 0;
export const getLatitude = () => {
    if (latitude != 0) return latitude;
    const l = localStorage.getItem('_latitude');
    return l ? +l : 0;
}
export const setLatitude = (l: number) => localStorage.setItem('_latitude', (latitude = l).toString());