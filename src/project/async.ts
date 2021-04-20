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
                    throw new Error("n is < 25")
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
                    throw new Error("n is < 25")
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
                    throw new Error("n is < 25")
                }
                resolve([...arr, n])
            } catch (e) {
                reject(e)
            }
        }, 1000)
    })
}

doSomethingAsync([1])
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