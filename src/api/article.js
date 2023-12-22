import service from "../http/request";
const url = {
    articleMess:"/search/entity/search/specific",
}
export class Article{
    static async articleMess(data) {
        return service(url.articleMess, {
            method: "POST",
            data,
          });
    }
}