import service from "@/http/request";
import Cookies from 'js-cookie';
const url = {
    submit: "/application/user_submit_application",
    read: "/application/admin_get_application",
    review: "/application/admin_audit_application",
}
const reviewAPI = {
    async submit(data) {
        return service(url.submit, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async read(data) {
        return service(url.read, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async review(data) {
        return service(url.review, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },

}
export default reviewAPI;

function getToken() {
    const token = Cookies.get('token');
    if (token) {
        return token
    } else return false
}