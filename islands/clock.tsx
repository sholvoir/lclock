import { Signal } from "@preact/signals";
import { ebtext } from "../lib/eb.ts";

const coordinate = (a: number) => {
    const radian = 2 * Math.PI * a;
    return [-Math.sin(radian), Math.cos(radian)];
};

const quarterLine = () => {
    const result = [];
    for (let i = 0; i < 48; i++) {
        const coo = coordinate(i/48);
        const [x1, y1] = coo.map(p => 500*p);
        const [x2, y2] = coo.map(p => 512*p);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    for (let i = 0; i < 48; i++) {
        const coo = coordinate(i/48+1/96);
        const [x1, y1] = coo.map(p => 506*p);
        const [x2, y2] = coo.map(p => 512*p);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    return result;
}
const dizhiText = () => {
    const result = []
    for (let i = 0; i < 12; i++) {
        const [x, y] = coordinate(i/12).map(p => 468*p);
        result.push(<text x={x-24} y={y+20} transform-origin={`${x} ${y}`} transform={`rotate(${180+i*30})`}>{ebtext[i]}</text>);
    }
    return result;
}
const bhourLine = (second: number) => {
    const coo = coordinate(second/86400);
    const [x1, y1] = coo.map(r => -50*r)
    const [x2, y2] = coo.map(r => 500*r);
    return <line x1={x1} y1={y1} x2={x2} y2={y2}/>
}

interface IClockProps {
    second: Signal<number>;
}
export default ({second}: IClockProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="-512 -512 1024 1024" fill="currentcolor" stroke="currentcolor">
    <g fill="none" stroke-width="2">{[511, 500, 436].map(r => <circle r={r}/>)}</g>
    <g font-size="48">{dizhiText()}</g>
    <g stroke-width="2">{quarterLine()}</g>
    <circle r="6"/>
    <g stroke-width="2">{bhourLine(second.value)}</g>
</svg>