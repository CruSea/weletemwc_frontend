/**
 * Created by BENGEOS on 11/24/18.
 */
export class LoginUser {
    public email: string;
    public password: string;
    constructor() {
        this.email = '';
        this.password = '';
    }
}
export class RegisterUser {
    public full_name: string;
    public email: string;
    public password: string;
    constructor() {
        this.full_name = '';
        this.email = '';
        this.password = '';
    }
}
export class AuthCallback {
    public isValid: boolean;
    public error: string;
    public message: string;
    constructor() {
        this.isValid = false;
        this.error = '';
        this.message = '';
    }
}