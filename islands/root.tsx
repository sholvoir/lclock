import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import Clock from "./clock.tsx";

let i = 0;
let longitude = 0;
const getLongitude = () => {
    if (longitude != 0) return longitude;
    const l = localStorage.getItem('_longitude');
    return l ? +l : -60;
}
const setLongitude = (l: number) => localStorage.setItem('_longitude', (longitude = l).toString());

const timeConvert = (second: number) => Math.round(second + 240 * getLongitude());

export default () => {
    if (!IS_BROWSER) return <svg/>
    const second = useSignal(timeConvert(Date.now()/1000));
    useEffect(() => {
        const interval = setInterval(() => {
            second.value = timeConvert(Date.now()/1000);
            if (i++%300==0) navigator.geolocation.getCurrentPosition(position => {
                if (position.coords.longitude !== null) setLongitude(position.coords.longitude);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <Clock second={second}/>
}