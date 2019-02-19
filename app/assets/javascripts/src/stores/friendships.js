import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class FriendshipsStore extends BaseStore {
  getFriends() {
    if (!this.get('currentUserFriends')) this.setFriends([])
    return this.get('currentUserFriends')
  }
  setFriends(array) {
    this.set('currentUserFriends', array)
  }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
}
const FriendshipStore = new FriendshipsStore()

FriendshipsStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_FRIENDS:
      FriendshipStore.setFriends(action.json)
      FriendshipStore.emitChange()
      break
  }

  return true
})

export default FriendshipStore
