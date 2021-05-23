

function strEnum<T extends string> (o:Array<T>): {[K in T]: K} {
    return o.reduce((res,key)=>{
        res[key] = key;
        return res;
    },Object.create(null))
}

const Direction = strEnum(['North', 'South', 'East', 'West'])
console.log("\nDirection:")
console.log(Direction)
console.log('typeof Direction')
console.log(typeof Direction)
// console.log(keyof Direction)

type Direction = keyof typeof Direction;
console.log('\nDirection type:')
console.log(Direction)

let sample: Direction;

sample = Direction.North;
sample = 'North';
// sample = 'AnythingElse';
