import service from "../http/request";
import Cookies from 'js-cookie';
// import service from "@/http/request";
const url = {
    login:"/user/login",
    register:"/user/register",
}
export class Login{
    static async login(data) {
        return service(url.login, {
            method: "POST",
            data,
          });
    }
    static async register(data) {
        return service(url.register, {
            method: "POST",
            data,
          });
    }
}

