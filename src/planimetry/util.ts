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


