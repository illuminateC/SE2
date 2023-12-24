import service from "../http/request";
import Cookies from 'js-cookie';
// import service from "@/http/request";
const url = {
    articleMess:"/search/entity/search/specific",
    articleComment:"/comment/get_all_comments",
    createComment:"/comment/create_comment",
    deleteComment:"/comment/delete_comment",
    getCollection:"/collection/get_another_collection_package_list",
    addToFav:"/collection/collect_work",
    removeFromFav:"/collection/cancel_work",
    likeComment:"/comment/like_comment",
    dislikeComment:"/comment/dislike_comment",
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
    static async createComment(data) {
        return service(url.createComment, {
            method: "POST",
            data,
            headers: {
                Authorization: getToken()
            },
          });
    }
    static async deleteComment(data) {
        return service(url.deleteComment, {
            method: "POST",
            data,
            headers: {
                Authorization: getToken()
            },
          });
    }
    static async getCollection(data) {
        return service(url.getCollection, {
            method: "POST",
            data,
            headers: {
                Authorization: getToken()
            },
          });
    }
    static async addToFav(data) {
        return service(url.addToFav, {
            method: "POST",
            data,
            headers: {
                Authorization: getToken()
            },
          });
    }
    static async removeFromFav(data) {
        return service(url.removeFromFav, {
            method: "POST",
            data,
            headers: {
                Authorization: getToken()
            },
          });
    }
    static async likeComment(data) {
        return service(url.likeComment, {
            method: "POST",
            data,
            headers: {
                Authorization: getToken()
            },
          });
    }
    static async dislikeComment(data) {
        return service(url.dislikeComment, {
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