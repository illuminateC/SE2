import service from "../http/request";
import Cookies from 'js-cookie';
const url = {
    getAuthorInformation: "/search/entity/search/specific",
    getAuthorRelation: "/user/getrelation",
    getIfAuthenticated: "/user/getisauth",
    uploadAuthentication: "/application/user_submit_application",
}
export class AuthorAPI{
    static async getAuthorInformation(data) {
        return service(url.getAuthorInformation, {
            method: "POST",
            data,
        });
    }
    static async getAuthorRelation(data) {
      return service(url.getAuthorRelation, {
          method: "POST",
          data,
      });
    }
    static async getIfAuthenticated(data) {
        return service(url.getIfAuthenticated, {
            method: "POST",
            data,
        });
    }
    static async uploadAuthentication(data) {
        return service(url.uploadAuthentication, {
            method: "POST",
            data,
            headers: {
                // ContentType: "application/form-data",
                // ContentType: "multipart/form-data",
                Authorization: getToken()
            }
        });
    }
}

function getToken() {
    const token = Cookies.get('token');
    if (token) {
        return token
    } else return false
}
