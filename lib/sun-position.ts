import { getJuliaDay } from "./date.ts";
import { asin, atan2, cos, sin } from "./math.ts";

export const getSunCoordinates = (unixTime: number) => {
    const n = getJuliaDay(unixTime) - 2451545 + 0.0008; // 天数自J2000.0
    const L = (280.46 + 0.9856474 * n) % 360; // 平均太阳经度，光行差修正
    const g = (357.528 + 0.9856003 * n) % 360; // 平均太阳偏差
    const lambda = L + 1.915 * sin(g) + 0.02 * sin(2*g); // 太阳黄经
    const beta = 0; // 太阳黄纬
    const R = 1.00014 - 0.01671 * cos(g) - 0.00014 * cos(2*g); // 太阳距离
    const epsilon = 23.439 - 0.0000004 * n; // 黄道倾角
    const alpha = atan2(cos(epsilon)*sin(lambda), cos(lambda)); //太阳赤经
    const delta = asin(sin(epsilon)*sin(lambda)); //太阳赤纬
    return { R, rightAscension: alpha, declination: delta, eclipticLongitude: lambda, eclipticLatitude: beta }
}
