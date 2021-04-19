export interface Comparable<T>{
    equals(value: T): boolean;
}

export interface RectangleInterface{
    width: number;
    height: number;
}

export function isEqual<TVal, T extends Comparable<TVal>>(comparable: T, value: TVal) : boolean{
    return comparable.equals(value);
}