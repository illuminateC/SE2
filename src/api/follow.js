import service from "@/http/request";
import Cookies from 'js-cookie';

const url = {
    follow: "/follow/follow",
    unFollow: "/follow/unfollow",
    followList: "/follow/getfollowlist",
}

const followAPI = {
    async follow(data) {
        return service(url.follow, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async unFollow(data) {
        return service(url.unFollow, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async followList(data) {
        return service(url.followList, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    }
}
export default followAPI;

function getToken() {
    const token = Cookies.get('token');
    if (token) {
        return token
    } else return false
}