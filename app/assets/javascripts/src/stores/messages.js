import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UserStore from '../stores/user'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  getMessages() {
    if (!this.get('userMessages')) this.setMessages([])
    return this.get('userMessages')
  }
  setMessages(array) {
    this.set('userMessages', array)
  }
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    // return openChatID
  }
  getChatByUserID(id) {
    // return messages[id]
  }
  getAllChats() {
    // return messages
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_MESSAGES:
      // console.log('MessagesStore : GET_MESSAGES')
      // console.log(action)
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break

    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      // openChatID = action.userID
      // messages[openChatID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
      break

    case ActionTypes.SEND_MESSAGE:
      console.log('MessagesStore : SEND_MESSAGE')
      console.log(action)
      const message = action.json
      const userID = message.user_id
      const messages = MessagesStore.getMessages()
      console.log(userID)
      console.log(messages)
      messages.push({
        text: message.text,
        user_id: userID,
        created_at: message.created_at,
        // from: UserStore.user.id,
      })
      // messages[userID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
