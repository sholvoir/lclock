import { useSignal } from "@preact/signals";
import Clock from "./clock.tsx";

export default () => {
    const second = useSignal(10000);
    return <Clock second={second}/>
}