console.log(this)

function fone(){
    console.log('')
}
fone()

const valueOfThis = { name: "Anakin", surname: "Skywalker"}
console.log.call(valueOfThis, "Mos espa")

