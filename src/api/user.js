import service from "@/http/request";
import Cookies from 'js-cookie';
const url= {
    register:"/user/register",
    login:"/user/login",
    logout:"/user/logout",
    changeInfo: "/user/changeinfo",
    changePassword:"/user/changepassword",
    uploadAvatar:"/user/avatar/upload",
    getAvatar:"/user/avatar/get",

}
const userAPI={
    async register(data){
        return service(url.register,{
        method:"post",data,
        });
    },
    async login(data){
        return service(url.login,{
            method:"post",
            data
        });
    },
    async logout(){
        return service(url.logout,{
            method:"post",
            headers:{
                Authorization:getToken(),
            }
        });
    },
    async changeInfo(data){
        return service(url.changeInfo,{
            method:"post",
            data,
        });
    },
    async changepassword(data){
        return service(url.changePassword,{
            method:"post",
            data,
        });
    },
    async getAvatar(data){
        return service(url.getAvatar,{
            method:"post",
            data,
        });
    },
    async uploadAvatar(data){
        return service(url.uploadAvatar,{
            method:"post",
            data,
            headers:{
                ContentType :"application/form-data",
                Authorization:getToken()
            }
        })
    }
    
}
export default userAPI;

function getToken(){
    const token = Cookies.get('token');
    if (token) {
      return token
    } else return false
}