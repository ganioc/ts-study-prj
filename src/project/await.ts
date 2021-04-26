const p = Promise.resolve(3);

async function fn(): Promise<number> {
    const i = await p;
    return i + 1;
}

fn()
    .then((result)=>
        console.log(result)
    )

