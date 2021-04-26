class Fib implements IterableIterator<number>{
    protected fn1 = 0;
    protected fn2 = 1;

    public constructor(protected maxValue?: number){}

    public next():IteratorResult<number>{
        const current = this.fn1;
        this.fn1 = this.fn2;
        this.fn2 = current + 1;
        if(this.maxValue && current <= this.maxValue){
            return {
                done:false,
                value: current
            }
        }else{
            return {
                done: true,
                value: 0
            }
        }
    }
    public [Symbol.iterator](): IterableIterator<number>{
        return this;
    }
}

const fib = new Fib(5);

console.log(fib.next())
console.log(fib.next())

const fibMax21 = new Fib(21);

for (const num of fibMax21){
    console.log(num)
}