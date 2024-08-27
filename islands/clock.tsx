import { Signal } from "@preact/signals";
import { ebtext, ebdtext, quartertext, dititalCn } from "../lib/eb.ts";

const [r1, r2, r3, r4, r5] = [120, 424, 436, 498, 510];
const tquart = 96;
const tsecond = 180;
const bhour = 12;
const longScale = 12;
const shortScale = 6;

const clockCoor2SvgCoor = ([radius, angleCents]: [number, number]) => {
    const radian = 2 * Math.PI * angleCents;
    return [radius * Math.sin(radian), -radius * Math.cos(radian)];
}

const quarterLine = () => {
    const result = [];
    const h = tquart / 2
    for (let i = 0; i < h; i++) {
        const [x1, y1] = clockCoor2SvgCoor([r3-longScale, i/h]);
        const [x2, y2] = clockCoor2SvgCoor([r3, i/h]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    for (let i = 0; i < h; i++) {
        const [x1, y1] = clockCoor2SvgCoor([r3-shortScale, i/h+1/tquart]);
        const [x2, y2] = clockCoor2SvgCoor([r3, i/h+1/tquart]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    return result;
}
const secondLine = () => {
    const result = [];
    const h = tsecond/2;
    for (let i = 0; i < h; i++) {
        const [x1, y1] = clockCoor2SvgCoor([r5-longScale, i/h]);
        const [x2, y2] = clockCoor2SvgCoor([r5, i/h]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    for (let i = 0; i < h; i++) {
        const [x1, y1] = clockCoor2SvgCoor([r5-shortScale, i/h+1/tsecond]);
        const [x2, y2] = clockCoor2SvgCoor([r5, i/h+1/tsecond]);
        result.push(<line x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    return result;
}
const dizhiText = () => {
    const result = [];
    const r = (r3+r4)/2;
    for (let i = 0; i < bhour; i++) {
        const [x, y] = clockCoor2SvgCoor([r, i/bhour]);
        result.push(<text x={x} y={y} alignment-baseline="central" transform-origin={`${x} ${y}`} transform={`rotate(${i*30})`}>{ebtext[i]}</text>);
    }
    return result;
}
const bhourLine = (second: number) => {
    const remain = second%86400/86400;
    const [x1, y1] = clockCoor2SvgCoor([r1, remain])
    const [x2, y2] = clockCoor2SvgCoor([r2-2, remain]);
    return <line x1={x1} y1={y1} x2={x2} y2={y2}/>;
}
const bsecondLine = (second: number) => {
    const remain = second%86400%3600%900/900;
    const [x1, y1] = clockCoor2SvgCoor([r1, remain])
    const [x2, y2] = clockCoor2SvgCoor([r4-2, remain]);
    return <line x1={x1} y1={y1} x2={x2} y2={y2}/>;
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
    return <g x="0" y="0" font-size="48" text-anchor="middle">
        <text alignment-baseline="text-after-edge">{ebdtext[hour]}{quartertext[quarter]}</text>
        <text alignment-baseline="text-before-edge">{dititalCn[bai]}{dititalCn[shi]}{dititalCn[remain]}</text>;
    </g>
}

interface IClockProps {
    second: Signal<number>;
}
export default ({second}: IClockProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="-512 -512 1024 1024" fill="currentcolor" stroke="currentcolor">
    <g fill="none" stroke-width="2">{[r1,r2,r3,r4,r5].map(r => <circle r={r}/>)}</g>
    <g font-size="48" text-anchor="middle">{dizhiText()}</g>
    <g stroke-width="2">{quarterLine()}{secondLine()}</g>
    <g stroke-width="2">{bhourLine(second.value)}{bsecondLine(second.value)}</g>
    {totalText(second.value)}
</svg>