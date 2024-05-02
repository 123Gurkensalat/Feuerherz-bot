export function PowerToInt(power: string): number{
    const res = power.split(/k/gi);
    const num = parseInt(res[0].replace(',', ''))
    return num * Math.pow(1000, res.length - 1);
}

export function IntToPower(num: number): string{
    let suffix = ''
    if(num >= 100_000){
        suffix = 'k';
        num /= 1_000;
    }else if(num >= 100_000_000){
        suffix = 'kk'
        num /= 1_000_000;
    }
    num = parseInt(num.toString());
    return num.toString() + suffix;
}