import { createSignal, onCleanup } from "solid-js";
import { getLongitude, setLongitude, setLatitude, setAltitude } from "../lib/coords.ts";
import Clock from "./clock.tsx";

let i = 0;
const timeConvert = (second: number) => Math.round(second + 240 * getLongitude());

export default () => {
const [second, setSecond] = createSignal(timeConvert(Date.now()/1000));
    const timer = setInterval(() => {
        setSecond(timeConvert(Date.now()/1000));
        if (i++%300 === 0) navigator.geolocation.getCurrentPosition(position => {
            if (position.coords.latitude !== null) setLatitude(position.coords.latitude);
            if (position.coords.longitude !== null) setLongitude(position.coords.longitude);
            if (position.coords.altitude !== null) setAltitude(position.coords.altitude);
        });
    }, 1000);
    onCleanup(() => clearInterval(timer));
    return <Clock second={second}/>
}