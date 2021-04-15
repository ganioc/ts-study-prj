import { Character } from "./project/character"

console.log('Your cli is running.')
console.log('Hello')

const n = 10;

console.log(n)

const character = new Character("John", "Smith");

console.log(character.greet())

interface StringArray{
    [index: number]: string;
}

const myArray: StringArray = ["Bob", "Fred", "John"];
const myString = myArray[0];
console.log("myString:", myString);