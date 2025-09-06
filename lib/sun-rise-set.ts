import { getLongitude, getLatitude } from "./coords.ts";
import { getJuliaDay } from "./date.ts";
import { sin } from "./math.ts";
import { getSunCoordinates } from "./sun-position.ts";

export const getSunRiseSet = () => {
    const n = getJuliaDay() - 2451545 + 0.0008; // 天数自J2000.0
    const J = n - getLongitude()/360;
    const M = (357.5291 + 0.98560028 * J) % 360; // 平均太阳偏差
    const C = 1.9148*sin(M) + 0.02*sin(2*M) + 0.0003*sin(3*M); // the Equation of the center value

    const phi = getLatitude(); //地球上观测者的纬度
    const sunCoords = getSunCoordinates();
    const alpha = -0.83; //太阳盘面中心点的高度
}