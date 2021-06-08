

interface GenericIndentityFn{
    <Type>(arg:Type): Type;
}
interface GenericIdentityFn2<Type>{
    (arg:Type):Type;
}

function identity<Type>(arg: Type): Type{
    return arg;
}
function identity2<Type>(arg: Type): Type{
    return arg;
}

let myIdentity:GenericIndentityFn =  identity;

let myIdentity2: GenericIdentityFn2<number> = identity2;

function create<Type>(c: { new (): Type }):Type{
    return new c();
}

export async function main(){
    const a = create(Number);
    console.log(a)
}
main();
