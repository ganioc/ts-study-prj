import "reflect-metadata"

function logType(target: any, key:string){
    const type = Reflect.getMetadata("design:type", target, key)
    console.log(`${key} type: ${type.name}`)
}

class Demo1{
    @logType
    public attr1: string;
    public constructor(attr1: string){
        this.attr1 = attr1;
    }
}