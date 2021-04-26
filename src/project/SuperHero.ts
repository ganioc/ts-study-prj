class Person{
    public constructor(protected name: string, protected surname: string){

    }
}
class SuperHero extends Person{
    public constructor( name:string, surname:string, public superpower: string){
        super(name, surname);

    }
    public useSuperPower(){
        return `I'm using my ${this.superpower}`
    }
}

// function myextends(d:any,b:any){
//     function intermediate() {
//         this.constructor = d;
//     }
//     for(const p in b) {
//         if( Object.prototype.hasOwnProperty.call(b, p)){
//             d[p] = b[p];
//         }

//         intermediate.prototype = b.prototype;
//         d.prototype = new intermediate();
//     }
// }
