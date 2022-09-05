/*
 * @Description: 后端返回状态字
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-04 21:16:39
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-08 14:53:44
 */
interface StatusObj {
  code: string;
  msg: string;
}
export const SUCCESS: StatusObj = {
  code: "200",
  msg: "login success",
};

/* 登录失败 */
export const LOGIN_ERROR: StatusObj = {
  code: "501",
  msg: "login error, the status code is 501",
};

/* 服务端异常，登录失败 */
export const LOGIN_SERVER_ERROR: StatusObj = {
  code: "580",
  msg: "server error, login error, the code is 580",
};

/* 服务端异常 */
export const SERVER_EXCEPTION: StatusObj = {
  code: "500",
  msg: "server exception, the status code is 500",
};

/* 提供信息错误导致相应失败 */
export const PROVIDE_INFO_ERROR: StatusObj = {
  code: "600",
  msg: "provide info error, response failed, the status code is 600",
};

/* 提交信息重复，如服务端某个号码已经注册 */
export const INFO_REPEAT: StatusObj = {
  code: "650",
  msg: "provide information already exist, response error, the status code is 650",
};

/* token验证失败 */
export const TOKEN_ERROR: StatusObj = {
  code: "700",
  msg: "Token Error, the status code is 700",
};
