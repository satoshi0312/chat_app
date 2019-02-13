import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  createFriendship(toUserID) {
    return new Promise((resolve, reject) => {
      request
      .post(APIEndpoints.FRIENDSHIPS)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        to_user_id: toUserID,
      })
      .end((error, res) => {
        if (!error && res.status === 302) {
          console.log(res)
        } else {
          reject(res)
        }
      })
    })
  },
  getCurrentUserFriends() {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.FRIENDS)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          console.log(json)
          Dispatcher.handleServerAction({
            type: ActionTypes.GET_FRIENDS,
            json,
          })
        }
      })
    })
  },
}

