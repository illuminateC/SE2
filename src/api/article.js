import service from "../http/request";
import Cookies from 'js-cookie';
// import service from "@/http/request";
const url = {
    articleMess:"/search/entity/search/specific",
    articleComment:"/comment/get_all_comments",
}
export class Article{
    static async articleMess(data) {
        return service(url.articleMess, {
            method: "POST",
            data,
          });
    }
    static async articleComment(data) {
        return service(url.articleComment, {
            method: "POST",
            data,
            headers: {
                Authorization: getToken()
            },
          });
    }
}

function getToken() {
    const token = Cookies.get('token');
    if (token) {
        return token
    } else return false
}