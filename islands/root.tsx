import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Clock from "./clock.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

let i = 0;

export default () => {
    if (!IS_BROWSER) return <svg/>
    const longitude = useSignal(0);
    const timeConvert = (second: number) => Math.round(second + 240 * longitude.value);
    const second = useSignal(timeConvert(Date.now()/1000));
    useEffect(() => {
        const interval = setInterval(() => {
            second.value = timeConvert(Date.now()/1000);
            if (i++%300==0) navigator.geolocation.getCurrentPosition(position => {
                if (position.coords.longitude !== null) longitude.value = position.coords.longitude;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <Clock second={second}/>
}