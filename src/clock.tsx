import { type JSX, type Accessor, For } from "solid-js";
import { ebtext, ebdtext, quartertext } from "../lib/eb.ts";

const width = 512;
const height = 512;
const [r1, r2, r3, r4, r5] = [4, 194, 200, 248, 254];
const tquart = 96;
const tsecond = 180;
const bhour = 12;
const longScale = 6;
const shortScale = 3;

const clockCoor2SvgCoor = ([radius, angleCents]: [number, number]) => {
    const radian = 2 * Math.PI * angleCents;
    return [radius * Math.sin(radian), -radius * Math.cos(radian)];
}

const quarterLine = () => {
    const result: Array<JSX.Element> = [];
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
    const result: Array<JSX.Element> = [];
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
    const result: Array<JSX.Element> = [];
    const r = (r2+r4-2)/2;
    for (let i = 0; i < bhour; i++) {
        const [x, y] = clockCoor2SvgCoor([r, i/bhour]);
        result.push(<text x={x} y={y} alignment-baseline="middle" transform-origin={`${x} ${y}`} transform={`rotate(${i*30})`}>{ebtext[i]}</text>);
    }
    return result;
}
const bhourLine = (second: number) => {
    const remain = second%86400/86400;
    const [x1, y1] = clockCoor2SvgCoor([-4*r1, remain])
    const [x2, y2] = clockCoor2SvgCoor([r2-2, remain]);
    return <line x1={x1} y1={y1} x2={x2} y2={y2}/>;
}
const bsecondLine = (second: number) => {
    const remain = second%86400%3600%900/900;
    const [x1, y1] = clockCoor2SvgCoor([-4*r1, remain])
    const [x2, y2] = clockCoor2SvgCoor([r4-2, remain]);
    return <line x1={x1} y1={y1} x2={x2} y2={y2}/>;
}
const totalText = (second: number) => {
    let remain = Math.round(second%(24*60*60));
    const hour = Math.floor(remain/(60*60));
    remain %= 60*60;
    const quarter = Math.floor(remain/(15*60));
    remain %= 15*60;
    // const bai = Math.floor(remain/100);
    // remain %= 100;
    // const shi = Math.floor(remain/10);
    // remain %= 10;
    return <text font-size="48" text-anchor="middle" alignment-baseline="text-after-edge">{ebdtext[hour]}{quartertext[quarter]}</text>
}

interface IClockProps {
    second: Accessor<number>;
}
// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
export default ({second}: IClockProps) => <svg xmlns="http://www.w3.org/2000/svg"
    viewBox={`${-width/2} ${-height/2} ${width} ${height}`} fill="currentcolor" stroke="currentcolor">
    <g fill="none" stroke-width="1">
        <For each={[r2,r3,r4,r5]}>{r => <circle r={r}/>}</For>
        </g>
    <circle r={r1}/>
    <g font-size="48" text-anchor="middle">{dizhiText()}</g>
    <g stroke-width="1">{quarterLine()}{secondLine()}</g>
    <g stroke-width="1">{bhourLine(second())}{bsecondLine(second())}</g>
    {totalText(second())}
</svg>