export function cartesianToPolar(x: number, y: number): {r: number, φ: number} {
    const r = Math.sqrt(x * x + y * y);
    const φ = Math.atan2(y, x);
    return {r, φ};
}

export function polarToCartesian(r: number, φ: number): {x: number, y: number} {
    const x = r * Math.cos(φ);
    const y = r * Math.sin(φ);
    return {x, y};
}

export function radianToDegree(angleRadian: number): number {
    return angleRadian * 57.2958;
}

export function degreeToRadian(angleDegree: number): number {
    return angleDegree * 0.0174533;
}

export function areEqualFloats(a: number, b: number, eps: number = 1e-6): boolean {
    return Math.abs(a - b) < eps;
}

export function isZero(n: number, eps: number = 1e-6): boolean {
    return areEqualFloats(n, 0, eps);
}
