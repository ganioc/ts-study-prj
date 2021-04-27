class NewContainer<T>{
    public static of <TVal>(val:TVal){
        return new NewContainer(val)
    }
    private _value:T;
    public constructor(val:T){
        this._value = val;
    }
    public map<TMap>(fn: (val:T)=> TMap){
        return new NewContainer<TMap>(fn(this._value))
    }
}

const newdouble = (x:number) => x+x;
const newcontainer = NewContainer.of(3);
console.log(newcontainer)
const newcontainer2 = newcontainer.map(newdouble) 
console.log(newcontainer2)

class MayBe<T>{
    public static of <TVal>(val?:TVal){
        return new MayBe(val)
    }
    private _value!:T;
    public constructor(val?:T){
        if(val){
            this._value = val;
        }
    }
    public isNothing(){
        return (this._value === null || this._value === undefined)
    }
    public map<TMap>(fn: (val:T) =>TMap){
        if(this.isNothing()){
            return new MayBe<TMap>()
        }else{
            return new MayBe<TMap>(fn(this._value))
        }
    }
}

class Nothing<T>{
    public static of<TVal> (val?: TVal){
        return new Nothing(val)
    }
    private _value: T| undefined;
    public constructor(val?:T){
        this._value = val;
    }
    public map<TMap>(fn: (val:T)=> TMap){
        if(this._value !== undefined){
            return new Nothing<TMap>(fn(this._value));
        }else{
            return new Nothing<TMap>(this._value as any)
        }
    }
}

class Just<T>{
    public static of<TVal>(val: TVal){
        return new Just(val)
    }
    private _value: T;
    public constructor(val:T){
        this._value = val;
    }
    public map<TMap>(fn:(val:T)=>TMap){
        return new Just<TMap>(fn(this._value))
    }
}