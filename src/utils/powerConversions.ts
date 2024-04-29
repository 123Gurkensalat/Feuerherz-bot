export function PowerToInt(power: string): number{
    const res = power.split(/k/gi);
    return parseInt(res[0]) * Math.pow(1000, res.length - 1);
}