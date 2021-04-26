function makeArmy(){
    const shooters = [];
    for(let i=0; i< 10; i++){
        const shooter = ()=>{
            console.log(i);
        }
        shooters.push(shooter)
    }
    return shooters;
}
const army = makeArmy()
army[0]()
army[1]()
army[2]()

function addMany(...numbers:number[]):number{
    return numbers.reduce((p,c)=> p+c, 0);

}
console.log("addMany:", addMany(1,2,3))

const compose = <T>(f: (x:T)=> Text, g: (x:T)=> T) => (x:T)=>f(g(x))

const factorial = (n: number):number =>
    (n === 0)?1: (n* factorial(n-1));
console.log("factorial:", factorial(5))

class Container<T>{
    private _value:T;
    public constructor(val:T){
        this._value = val;
    }
    public map<TMap>(fn: (val:T)=>TMap){
        return new Container<TMap>(fn(this._value))
    }
}
const double = (x: number) => x + x;
const container = new Container<number> (3);
const container2 = container.map(double)
console.log(container2)