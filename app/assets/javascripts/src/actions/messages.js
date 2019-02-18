import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(friendID) {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.MESSAGES + '/' + friendID) // 取得したいjsonがあるURLを指定する
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.UPDATE_OPEN_CHAT,
            json, // json: jsonと同じ。keyとvalueが一致する場合、このように省略出来ます。
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  sendMessage(friendshipID, message) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.MESSAGES) // 後ほど説明します。
      .set('X-CSRF-Token', CSRFToken()) // 後ほど説明します。
      // これによりサーバ側に送りたいデータを送ることが出来ます。
      .send({
        friendship_id: friendshipID,
        text: message,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_MESSAGE,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
  sendImage(friendshipID, file) {
    console.log(file)
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.MESSAGES + '/upload')
      .set('X-CSRF-Token', CSRFToken())
      .attach('image', file, file.name)
      .field('friendship_id', friendshipID)
      .end((error, res) => {
        if (!error && res.status === 200) {
          console.log(res)
          const json = JSON.parse(res.text)
          console.log(json)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEND_IMAGE,
            json,
          })
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
}
