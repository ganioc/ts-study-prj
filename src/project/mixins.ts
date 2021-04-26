function applyMixins(derived: any, bases: any[]){
    bases.forEach( base =>{
        const props = Object.getOwnPropertyNames(base.prototype);
        props.forEach(name=>{
            if(name !== "constructor"){
                derived.prototype[name] =  base.prototype[name]
            }
        })
    })
}

class Mammal{
    public breath():string{
        return "I'm alive."
    }
}
class WingedAnimal{
    public fly():string{
        return "I can fly."
    }
}

class Bat implements Mammal, WingedAnimal{
    public eat!:()=>string;
    public breath!:()=>string;
    public fly!:()=> string;
}

async function main() {
    applyMixins(Bat, [Mammal, WingedAnimal])

    const bat = new Bat();
    console.log(bat.breath());
    console.log(bat.fly())
    
}
main()