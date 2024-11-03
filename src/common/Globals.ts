const Utils = {
    lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t
    }
}


export default Utils