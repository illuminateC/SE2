import service from "@/http/request";
import Cookies from 'js-cookie';
const url = {
    addCollectionPackage: "/collection/add_collection_package",
    changePackageName: "/collection/change_package_name",
    cancelWork: "/collection/cancel_work",
    deleteCollectionPackage: "/collection/delete_collection_package",
    collectionGetAll: "collection/get_another_collection_package_list",
    collectionGetEach: "/collection/get_collection"
}
const collectionAPI = {
    async addCollectionPackage(data) {
        return service(url.addCollectionPackage, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async changePackageName(data) {
        return service(url.changePackageName, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async cancelWork(data) {
        return service(url.cancelWork, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async deleteCollectionPackage(data) {
        return service(url.deleteCollectionPackage, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async collectionGetAll(data) {
        return service(url.collectionGetAll, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    },
    async collectionGetEach(data) {
        return service(url.collectionGetEach, {
            method: "post",
            data,
            headers: {
                Authorization: getToken()
            }
        })
    }
}
export default collectionAPI;

function getToken() {
    const token = Cookies.get('token');
    if (token) {
        return token
    } else return false
}