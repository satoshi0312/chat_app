import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  searchUsers(keyword) {
    return new Promise((resolve, reject) => {
      request
      .get(APIEndpoints.USERS_SEARCH)
      .query({
        keyword: keyword,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SEARCH_USERS,
            json,
          })
        } else {
          reject(res)
        }
      })
    })
  },
}
