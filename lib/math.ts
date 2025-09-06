const d2r = (degree: number) => degree * Math.PI / 180;
const r2d = (radian: number) => radian * 180 / Math.PI;

export const sin = (degree: number) => Math.sin(d2r(degree));
export const cos = (degree: number) => Math.cos(d2r(degree));
export const tan = (degree: number) => Math.tan(d2r(degree));
export const atan2 = (y: number, x: number) => r2d(Math.atan2(y, x));
export const asin = (x: number) => r2d(Math.asin(x));