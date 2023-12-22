import service from "../http/request";
const url = {
    getAuthorInformation: "/search/entity/search/specific",
    getAuthorRelation: "/user/getrelation",
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
}
