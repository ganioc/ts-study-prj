type Keyify<T> = {
    [P in keyof T]: P;
}
interface User{
    name: string;
    age: number;
}

function getKeys<T>(obj: T): Keyify<T>{
    const keysArr = Object.keys(obj);

    const stringifyObj = keysArr.reduce((p, c, i, a)=>{
        return {
            ...p,
            [c]:c
        }
    },{})
    return stringifyObj as Keyify<T>;
}

const user: User = { name: "Remo", age: 28};
const keys = getKeys<User>(user);
console.log(keys.name, keys.age)

// Declares all properties in T optional
type Partial<T> = {
    [P in keyof T]?: T[P];
}
type Readonly<T> = {
    readonly [P in keyof T] : T[P]
}
// pick a set of properties 
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
// with a set of properties K of type T
type Record<K extends string, T> = {
    [P in K]: T;
}