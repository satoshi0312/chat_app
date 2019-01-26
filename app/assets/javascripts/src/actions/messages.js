import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.MESSAGES) // 取得したいjsonがあるURLを指定する
      .end(error, res) => {
        if (!error && res.status === 200) { // 200はアクセスが成功した際のステータスコードです。
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.UPDATE_OPEN_CHAT_ID,
            userID: newUserID,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      }
    })
  },

  sendMessage(userID, message) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.MESSAGES) // 後ほど説明します。
      .set('X-CSRF-Token', CSRFToken()) // 後ほど説明します。
      // これによりサーバ側に送りたいデータを送ることが出来ます。
      .send({
        user_id: userId,
        text: message,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            userId,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },

}
