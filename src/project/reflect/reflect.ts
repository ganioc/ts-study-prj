/* Some test
*/

class ModelOne {
    sayHi(){
        console.log(`My name is`)
    }
    getData() {
        return [{
            id: 1,
            name: 'Niko'
        },
        {
            id: 2,
            name: 'Bellic'
        }]
    }
}
// function nameAdd (constructor){
//     return class extends constructor{
//         name = 'KiKo'
//     }
// }

function wrap(Model:ModelOne, key:string){
    console.log('hello wrap')
}

console.log(new ModelOne().getData())