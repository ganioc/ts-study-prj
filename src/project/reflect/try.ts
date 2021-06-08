import 'reflect-metadata';

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


console.log('\nReflect metadata')
function xx(target: any){
    return Reflect.metadata('role', 'jffff');
}

@xx('w')
class Post{
    @Reflect.metadata('role', 'jeff')
    name = ''
}

const metadata = Reflect.getMetadata('role', Post)
console.log(metadata)
const me = Reflect.getMetadata('role', new Post(), 'name')
console.log(me)

console.log('check->', typeof Reflect.defineMetadata)

const target = {name: 'Ross'};

Reflect.defineMetadata('version', 1, target)
Reflect.defineMetadata('info', {props:1}, target)
Reflect.defineMetadata('is', 'string', target, 'name')

console.log('target ->', target)
console.log('target(info)->', Reflect.getMetadata('info', target))
console.log('target.name(is)->', Reflect.getMetadata('is', target, 'name'))

console.log('has: target(version)->', 
    Reflect.hasMetadata('version', target))
console.log('keys:target ->', Reflect.getMetadataKeys(target))

function myDecorator(metaValue:any){
    return Reflect.metadata('returns', metaValue)
}

@Reflect.metadata('version', 1)
class Person{
    fname: string;
    lname: string;

    constructor(fname:string, lname:string){
        this.fname = fname
        this.lname = lname
    }

    @myDecorator({ returns:'string'})
    getFullName(){
        return this.fname + ' ' + this.lname;
    }
}
const person = new Person('Ross', 'Geller')
console.log('Person(version)->',
Reflect.getMetadata('version', Person));

console.log('person.getFullName(returns)->',
Reflect.getMetadata('returns', person, 'getFullName'))

