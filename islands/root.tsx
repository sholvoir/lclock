import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import Clock from "./clock.tsx";

let timediff = -4*60*60;
const timeConvert = (second: number) => Math.round(second + timediff);


export default () => {
    const second = useSignal(timeConvert(Date.now()/1000));
    useEffect(() => {
        const interval = setInterval(() => {
            second.value = timeConvert(Date.now()/1000);
        }, 1000);
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            timediff = (60 * 60) * position.coords.longitude / 15;
            console.log(timediff, -4*60*60);
        });
        return () => clearInterval(interval);
    }, []);
    return <Clock second={second}/>
}