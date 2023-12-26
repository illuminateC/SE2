import service from "@/http/request";
import Cookies from 'js-cookie';
const url = {
    getMessageList: "/message/get_message_list",
    readMessage: "/message/read_message",
    readAllMessage: "/message/read_all/messages",
    deleteMessage: "/message/delete_message",
    deleteAllMessage: "/message/delete_all_messages",
}
const messageAPI = {
    async getMessageList(data) {
        return service(url.getMessageList, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async readMessage(data) {
        return service(url.readMessage, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async readAllMessage(data) {
        return service(url.readAllMessage, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async delete_message(data) {
        return service(url.deleteMessage, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async deleteAllMessage(data) {
        return service(url.deleteAllMessage, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    }
}
export default messageAPI;

function getToken() {
    const token = Cookies.get('token');
    if (token) {
        return token
    } else return false
}