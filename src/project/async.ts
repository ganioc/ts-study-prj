import { rejects } from "node:assert"
import { textChangeRangeIsUnchanged } from "typescript"

function foo() {
    return new Promise<string>((resolve, reject) => {
        try {
            resolve("Some value")
        } catch (e) {
            reject(e)
        }
    })
}

foo()
    .then((value) => {
        console.log("get value:", value)
    })
    .catch((e) => {
        console.log(e)
    })

function doSomethingAsync(arr: number[]) {
    return new Promise<number[]>((resolve, reject) => {
        setTimeout(() => {
            try {
                const n = Math.ceil(Math.random() * 100 + 1);
                if (n < 25) {
                    throw new Error("async - n is < 25")
                }
                resolve([...arr, n])
            } catch (e) {
                reject(e)
            }
        }, 1000)
    })
}

function doSomethingElseAsync(arr: number[]) {
    return new Promise<number[]>((resolve, reject) => {
        setTimeout(() => {
            try {
                const n = Math.ceil(Math.random() * 100 + 1);
                if (n < 25) {
                    throw new Error("else - n is < 25")
                }
                resolve([...arr, n])
            } catch (e) {
                reject(e)
            }
        }, 1000)
    })
}
function doSomethingMoreAsync(arr: number[]) {
    return new Promise<number[]>((resolve, reject) => {
        setTimeout(() => {
            try {
                const n = Math.ceil(Math.random() * 100 + 1);
                if (n < 25) {
                    throw new Error("more - n is < 25")
                }
                resolve([...arr, n])
            } catch (e) {
                reject(e)
            }
        }, 1000)
    })
}

doSomethingAsync([])
    .then((arr1) => {
        doSomethingElseAsync(arr1).then((arr2) => {
            doSomethingMoreAsync(arr2).then((arr3) => {
                console.log(
                    `
                    doSomethingAsync: ${arr3[0]}
                    doSomethingElseAsync: ${arr3[1]}
                    doSomethingMoreAsync: ${arr3[2]}
                    `
                )
            })
        })
    })
    .catch((e) => {
        console.log(e)
    })

async function invokeTaskAsync() {
    const arr1 = await doSomethingAsync([])
    const arr2 = await doSomethingElseAsync(arr1)
    return await doSomethingMoreAsync(arr2)
}

invokeTaskAsync()
    .then((arr3)=>{
        console.log(
            `
            doSomethingAsync: ${arr3[0]}
            doSomethingElseAsync: ${arr3[1]}
            doSomethingMoreAsync: ${arr3[2]}
            `
        )
    })
    .catch((e)=>{
        console.log(e)
    })