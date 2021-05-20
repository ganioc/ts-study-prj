// import * as fs from "fs";
import * as  yargs  from "yargs";
// import glob from "glob";

async function mainyarg() {
    console.log("main()")
    console.log(yargs.argv.files)
    console.log(yargs.argv.find)

}

mainyarg()