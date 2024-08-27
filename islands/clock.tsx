import { Signal } from "@preact/signals";
import { ebtext, ebdtext, quartertext, dititalCn } from "../lib/eb.ts";

const clockCoor2SvgCoor = ([radius, angleCents]: [number, number]) => {
    const radian = 2 * Math.PI * angleCents;
    return [radius * Math.sin(radian), -radius * Math.cos(radian)];
}

const quarterLine = () => {
    const result = [];
    for (let i = 0; i < 48; i++) {
        const [x1, y1] = clockCoor2SvgCoor([424, i/48]);
        const [x2, y2] = clockCoor2SvgCoor([436, i/48]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    for (let i = 0; i < 48; i++) {
        const [x1, y1] = clockCoor2SvgCoor([430, i/48+1/96]);
        const [x2, y2] = clockCoor2SvgCoor([436, i/48+1/96]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    return result;
}
const secondLine = () => {
    const result = [];
    for (let i = 0; i < 90; i++) {
        const [x1, y1] = clockCoor2SvgCoor([500, i/90]);
        const [x2, y2] = clockCoor2SvgCoor([512, i/90]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    for (let i = 0; i < 90; i++) {
        const [x1, y1] = clockCoor2SvgCoor([506, i/90+1/180]);
        const [x2, y2] = clockCoor2SvgCoor([512, i/90+1/180]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    return result;
}
const dizhiText = () => {
    const result = []
    for (let i = 0; i < 12; i++) {
        const [x, y] = clockCoor2SvgCoor([470, i/12]);
        result.push(<text x={x} y={y} alignment-baseline="central" transform-origin={`${x} ${y}`} transform={`rotate(${i*30})`}>{ebtext[i]}</text>);
    }
    return result;
}
const bhourLine = (second: number) => {
    const [x2, y2] = clockCoor2SvgCoor([420, second/86400]);
    return <line x1="0" y1="0" x2={x2} y2={y2}/>
}
const bsecondLine = (second: number) => {
    const remain = second%86400%3600%900/900;
    const [x2, y2] = clockCoor2SvgCoor([511, remain]);
    return <line x1="0" y1="0"  x2={x2} y2={y2}/>
}
const totalText = (second: number) => {
    let remain = Math.round(second%(24*60*60));
    const hour = Math.floor(remain/(60*60));
    remain %= 60*60;
    const quarter = Math.floor(remain/(15*60));
    remain %= 15*60;
    const bai = Math.floor(remain/100);
    remain %= 100;
    const shi = Math.floor(remain/10);
    remain %= 10;
    return <g x="0" y="0" font-size="36" text-anchor="middle" filter="invert(100%)">
        <text alignment-baseline="text-after-edge">{ebdtext[hour]}{quartertext[quarter]}</text>
        <text alignment-baseline="text-before-edge">{dititalCn[bai]}{dititalCn[shi]}{dititalCn[remain]}</text>;
    </g>
}

interface IClockProps {
    second: Signal<number>;
}
export default ({second}: IClockProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="-512 -512 1024 1024" fill="currentcolor" stroke="currentcolor">
    <g fill="none" stroke-width="2">{[511, 500, 436, 424].map(r => <circle r={r}/>)}</g>
    <g font-size="48" text-anchor="middle">{dizhiText()}</g>
    <g stroke-width="2">{quarterLine()}{secondLine()}</g>
    <circle r="90"/>
    <g stroke-width="2">{bhourLine(second.value)}{bsecondLine(second.value)}</g>
    {totalText(second.value)}
</svg>