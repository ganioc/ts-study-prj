
interface ArrStr {
    [key: string]: string | number;
    [index: number]: string;
}
export async function main(): Promise<boolean> {
    console.log("Test typtes")

    type Index = 'a' | 'b' | 'c';
    type FromIndex = { [k in Index]: number };

    const good: FromIndex = { a: 2, c: 3, b: 4 };

    console.log('goods: ', good)

    type FromSomeIndex<K extends string> = { [key in K]: number };


    return true;
}

main()