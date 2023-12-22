import service from "../http/request";
const url = {
  getAuthorInformation: "/search/entity/search/specific",
  getAuthorRelation: "/user/getrelation",
};
export class Author {
  static async getAuthorInformation(data) {
    return service(url.getAuthorInformation, {
      // 方法，默认为 get
      method: "POST",
      // 返回值类型，默认为json
      responseType: "json",
      // 这里是 data: data的简写
      data,
    });
  }
  static async getAuthorRelation(data) {
    return service(url.getAuthorRelation, {
      method: "POST",
      responseType: "json",
      data,
    });
  }
  static async getAuthorPaper(paramUrl) {
    return service(paramUrl, {
      method: "GET",
      responseType: "json",
    });
  }
}
