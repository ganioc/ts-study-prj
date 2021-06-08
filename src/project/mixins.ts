function applyMixins(derived: any, bases: any[]) {
    bases.forEach(base => {
        const props = Object.getOwnPropertyNames(base.prototype);
        props.forEach(name => {
            if (name !== "constructor") {
                derived.prototype[name] = base.prototype[name]
            }
        })
    })
}

class Mammal {
    public breath(): string {
        return "I'm alive."
    }
}
class WingedAnimal {
    public fly(): string {
        return "I can fly."
    }
}

class Bat implements Mammal, WingedAnimal {
    public eat!: () => string;
    public breath!: () => string;
    public fly!: () => string;
}

type Constructor<T = any> = new (...args: any[]) => T;

function TimesTamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = Date.now();
    }
}
function Activatable<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        isActivated = false;
        activate() {
            this.isActivated = true;
        }
        deactivate() {
            this.isActivated = false;
        }
    }
}
class User {
    name = '';
}

const TimestampedUser = TimesTamped(User);
const TimestampedActivatableUser = TimesTamped(Activatable(User))


async function main() {
    applyMixins(Bat, [Mammal, WingedAnimal])

    const bat = new Bat();
    console.log(bat.breath());
    console.log(bat.fly())

    console.log('\\\\\\\\\\\\\\\\\\\n')
    const timestampedUserExample = new TimestampedUser();
    console.log(timestampedUserExample.timestamp)

    const timestampedActivatableUserExample = new TimestampedActivatableUser();
    console.log(timestampedActivatableUserExample.timestamp)
    console.log(timestampedActivatableUserExample.isActivated)

}
main()