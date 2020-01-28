export class User {
    public readonly id: string;
    public readonly name: string;
    public readonly fullName: string;
    constructor(id: string, name: string, fullName: string) {
        this.id = id;
        this.name = name;
        this.fullName = fullName;
    }
}