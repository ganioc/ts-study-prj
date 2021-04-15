class Character{
    public fullname: string;
    public constructor(firstname: string, lastname: string){
        this.fullname = `${firstname} ${lastname}`
    }
    public greet(name?: string): string{
        if(name){
            return `Hi ${name}! my name is ${this.fullname}`
        }else{
            return `Hi! my name is ${this.fullname}`
        }
    }
}

export {Character} ;