
    function filterByProperty<T, K extends keyof T>(
        property: K, entities: T[], value: T[K]
    ){
        return entities.filter(e=>e[property] === value);
    }
    
    interface UserS {
        surname: string;
        age: number;
    }
    
    const users : UserS[]= [
        {surname: "Smith", age: 28},
        {surname: "Johnson", age: 55},
        {surname: "Williams", age: 14}
    ];

    console.log(filterByProperty<UserS, "age">("age", users,21))
    console.log(filterByProperty<UserS, "surname">("surname", users, "Smith"))

