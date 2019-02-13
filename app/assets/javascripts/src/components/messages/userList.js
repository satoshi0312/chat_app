import React from 'react'
// import _ from 'lodash'
import classNames from 'classnames'
// import Utils from '../../utils'
// import UserStore from '../../stores/users'
// import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import FriendshipsStore from '../../stores/friendships'
import FriendshipsAction from '../../actions/friendships'
import {CSRFToken} from '../../constants/app'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    FriendshipsAction.getCurrentUserFriends()
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    const friends = FriendshipsStore.getFriends()
    // console.log(friends)
    // _.each(friends, (friend) => {
    // })
    return {
      friends: friends,
    }
    // 友達だけを表示させるために一旦コメントアウト
    // const allMessages = MessagesStore.getAllChats()

    // const messageList = []
    // _.each(allMessages, (message) => {
    //   const messagesLength = message.messages.length
    //   messageList.push({
    //     lastMessage: message.messages[messagesLength - 1],
    //     lastAccess: message.lastAccess,
    //     user: message.user,
    //   })
    // })
    // return {
    //   openChatID: MessagesStore.getOpenChatUserID(),
    //   messageList: messageList,
    // }
  }
  componentWillMount() {
    FriendshipsStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    FriendshipsStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }
  deleteChatConfirm(e) {
    if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      e.preventDefault()
    }
  }

  render() {
    const friends = this.state.friends.map((friend, index) => {
      console.log(friend)
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
      })
      return (
        <li
          onClick = { this.changeOpenChat.bind(this, friend.id) }
          className = { itemClasses }
          key = { friend.id }
        >
          <form
            action = {'/friendships/' + friend.id}
            method = 'post'
          >
            <input
              type='hidden'
              name='authenticity_token'
              value={CSRFToken()}
            />
            <input
              type = 'hidden'
              name = '_method'
              value = 'delete'
            />
            <input
              type = 'submit'
              value = '×'
              className = 'remove-chat-btn'
              onClick = { this.deleteChatConfirm }
            />
          </form>
          <div className='user-list__item__picture'>
            <img src={ friend.avatar } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friend.name }
            </h4>
          </div>
        </li>
      )
    })

    // 一旦コメントアウト
    // this.state.messageList.sort((a, b) => {
    //   if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
    //     return -1
    //   }
    //   if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
    //     return 1
    //   }
    //   return 0
    // })

    // const messages = this.state.messageList.map((message, index) => {
    //   const date = Utils.getNiceDate(message.lastMessage.timestamp)

    //   var statusIcon
    //   if (message.lastMessage.from !== message.user.id) {
    //     statusIcon = (
    //       <i className='fa fa-reply user-list__item__icon' />
    //     )
    //   }
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     statusIcon = (
    //       <i className='fa fa-circle user-list__item__icon' />
    //     )
    //   }

    //   var isNewMessage = false
    //   if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
    //     isNewMessage = message.lastMessage.from !== UserStore.user.id
    //   }

    //   const itemClasses = classNames({
    //     'user-list__item': true,
    //     'clear': true,
    //     // 'user-list__item--new': isNewMessage,
    //     // 'user-list__item--active': this.state.openChatID === message.user.id,
    //   })

    //   return (
    //     <li
    //       onClick={ this.changeOpenChat.bind(this, message.user.id) }
    //       className={ itemClasses }
    //       key={ message.user.id }
    //     >
    //       <div className='user-list__item__picture'>
    //         <img src={ message.user.profilePicture } />
    //       </div>
    //       <div className='user-list__item__details'>
    //         <h4 className='user-list__item__name'>
    //           { message.user.name }
    //           <abbr className='user-list__item__timestamp'>
    //             { date }
    //           </abbr>
    //         </h4>
    //         <span className='user-list__item__message'>
    //           { statusIcon } { message.lastMessage.contents }
    //         </span>
    //       </div>
    //     </li>
    //   )
    // }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          { friends }
        </ul>
      </div>
    )
  }
}

export default UserList
