function logClass<TFunction extends Function>(target: TFunction) {
    console.log(target)
    const originalConstructor = target;

    function logClassName(func: TFunction) {
        console.log("New: " + func.name)
    }
    function instanciate(constructor: any, ...args: any[]) {
        return new constructor(...args)
    }
    const newConstructor = function (...args: any[]) {
        logClassName(originalConstructor);
        return instanciate(originalConstructor, ...args)
    }
    newConstructor.prototype = originalConstructor.prototype;
    return newConstructor as any
}
@logClass
class NewPerson {
    public constructor(public name: string) {

    }
    public sayName() {
        console.log("name:", this.name)
    }
    public saySomething(something: string):string{
        return `${this.name} says: ${something}`
    }
}

const person = new NewPerson("John");
person.sayName()


interface NewTypedPropertyDescriptor<T> {
    enumerable?: boolean;
    configurable?: boolean;
    writable?: boolean;
    value?: T;
    get?: () => T;
    set?: (value: T) => void;
}

type NewMethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: NewTypedPropertyDescriptor<T>) => NewTypedPropertyDescriptor<T> | void;





function logMethod(target: any, key: string, descriptor: TypedPropertyDescriptor<any>) {
    console.log("target:", target)
    const originalMethod = descriptor.value;
    function logFunctionCall(method: string, args:string, result:string){
        console.log(`Call: ${method}(${args}) => ${result}`)
    }

    descriptor.value = function(this:any, ...args:any[]){
        const argsStr = args.map((a:any)=>{
            return JSON.stringify(a)
        }).join();

        const result = originalMethod.apply(this, args);
        const resultStr = JSON.stringify(result)

        console.log(`Call: ${key}(${argsStr})=> ${resultStr}`)
    }

}

