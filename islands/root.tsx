import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Clock from "./clock.tsx";

let timediff = -4*60*60;
const timeConvert = (second: number) => Math.round(second + timediff);
let i = 0;

export default () => {
    const second = useSignal(timeConvert(Date.now()/1000));
    useEffect(() => {
        const interval = setInterval(() => {
            second.value = timeConvert(Date.now()/1000);
            if (i++%300==0) navigator.geolocation.getCurrentPosition(position => timediff = 60 * 60 * position.coords.longitude / 15);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return <Clock second={second}/>
}