import { LoginService } from "./login.service";

export class Login {
    constructor(private LoginService: LoginService) {
        console.log(LoginService);
    }

    public testMethod(): number {
        return 3;
    }
}