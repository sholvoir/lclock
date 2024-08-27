import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Clock from "./clock.tsx";

let i = 0;
const getCoords = (): GeolocationCoordinates => {
    const coords = localStorage.getItem('_coords');
    return coords ? JSON.parse(coords) : { latitude: 0, longitude: 0, accuracy: 0 }
}

const setCoords = (coords: GeolocationCoordinates) => {
    localStorage.setItem('_coords', JSON.stringify(coords));
}

const timeConvert = (second: number) =>
    Math.round(second + 240 * getCoords().longitude);

export default () => {
    const second = useSignal(timeConvert(Date.now()/1000));
    useEffect(() => {
        const interval = setInterval(() => {
            second.value = timeConvert(Date.now()/1000);
            if (i++%300==0) navigator.geolocation.getCurrentPosition(position => setCoords(position.coords));
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <Clock second={second}/>
}