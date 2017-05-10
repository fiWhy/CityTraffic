export class User {
    public id: number;
    public username: string;
    public email: string;
    public image: string;
    public token: string;
    public additionalInfo: any;
    constructor(user: any) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.image = user.image;
        this.token = user.token;
        this.additionalInfo = user.additionalInfo;
    }
}