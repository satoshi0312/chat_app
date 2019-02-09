import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class UsersStore extends BaseStore {
  getUsers() {
    if (!this.get('searhUsers')) this.setUsers([])
    return this.get('searhUsers')
  }
  setUsers(array) {
    this.set('searhUsers', array)
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
      UserStore.setUsers(action.json)
      UserStore.emitChange()
      break

  }

  return true
})

export default UserStore
