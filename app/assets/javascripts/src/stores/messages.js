import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  getFriendMessages() {
    if (!this.get('friendMessages')) this.setFriendMessages([])
    return this.get('friendMessages')
  }
  setFriendMessages(array) {
    this.set('friendMessages', array)
  }
  getOpenChat() {
    if (!this.get('openChat')) this.setOpenChat({})
    return this.get('openChat')
  }
  setOpenChat(obj) {
    this.set('openChat', obj)
  }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT:
      {
        const friendMessages = action.json.friend_messages
        const friendship = action.json.friendship
        MessagesStore.setFriendMessages(friendMessages)
        MessagesStore.setOpenChat(friendship)
      }
      MessagesStore.emitChange()

      break

    case ActionTypes.SEND_MESSAGE:
      {
        const message = action.json
        const userID = message.user_id
        const messages = MessagesStore.getFriendMessages()
        messages.push({
          text: message.text,
          user_id: userID,
          created_at: message.created_at,
        })
      }
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_IMAGE:
      {
        const message = action.json
        const userID = message.user_id
        const messages = MessagesStore.getFriendMessages()
        messages.push({
          image: message.image,
          user_id: userID,
          created_at: message.created_at,
        })
      }
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
