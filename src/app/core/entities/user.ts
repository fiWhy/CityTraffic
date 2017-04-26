export class User {
    public username: string;
    public password: string;
    public token: string;
    constructor(user: any) {
        this.username = user.username;
        this.password = user.password;
        this.token = user.token;
    }
}