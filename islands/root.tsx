import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { getLongitude, setLongitude, setLatitude } from "../lib/coords.ts";
import Clock from "./clock.tsx";

let i = 0;
const timeConvert = (second: number) => Math.round(second + 240 * getLongitude());

export default () => {
    if (!IS_BROWSER) return <svg/>
    const second = useSignal(timeConvert(Date.now()/1000));
    useEffect(() => {
        const interval = setInterval(() => {
            second.value = timeConvert(Date.now()/1000);
            if (i++%300==0) navigator.geolocation.getCurrentPosition(position => {
                if (position.coords.latitude !== null) setLatitude(position.coords.latitude);
                if (position.coords.longitude !== null) setLongitude(position.coords.longitude);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <Clock second={second}/>
}