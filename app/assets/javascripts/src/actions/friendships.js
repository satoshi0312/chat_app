import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  getCurrentUserFriends() {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.FRIENDS)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDS,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}

