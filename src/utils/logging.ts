import { UserInfo } from "../types/index.js";
export const log = (message: string) => {
  return console.log(`[LOG-${new Date().toLocaleTimeString()}] ${message}`);
};

export const error = (message: string) => {
  return console.error(`[ERROR-${new Date().toLocaleTimeString()}] ${message}`);
};

export const getCurrentUserInfo = (api: any): Promise<UserInfo> => {
  return new Promise(async (resolve, reject) => {
    api.getUserInfo([await api.getCurrentUserID()], (err: any, data: any) => {
      if (err) {
        reject(err);
      }

      resolve(data[Object.keys(data)[0]]);
    });
  });
};

export const getUserInfo = (api: any, userID: string): Promise<UserInfo> => {
  return new Promise<UserInfo>(async (resolve, reject) => {
    api.getUserInfo([userID], (err: any, data: any) => {
      if (err) {
        reject(err);
      }

      resolve(data[Object.keys(data)[0]]);
    });
  });
};
