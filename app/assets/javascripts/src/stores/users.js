import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UsersStore extends BaseStore {
  getSearchUsers() {
    if (!this.get('searhUsers')) this.setSearchUsers([])
    return this.get('searhUsers')
  }
  setSearchUsers(array) {
    this.set('searhUsers', array)
  }
  getCurrentUser() {
    console.log('getCurrentUser')
    if (!this.get('currentUser')) this.setSearchUsers([])
    return this.get('currentUser')
  }
  setCurrentUser(obj) {
    console.log('setCurrentUser')
    this.set('currentUser', obj)
  }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
}
const UserStore = new UsersStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SEARCH_USERS:
      UserStore.setSearchUsers(action.json)
      UserStore.emitChange()
      break

    case ActionTypes.GET_CURRENT_USER:
      UserStore.setCurrentUser(action.json)
      UserStore.emitChange()
      break

  }

  return true
})

export default UserStore
