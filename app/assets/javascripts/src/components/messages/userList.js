import React from 'react'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
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
    const openChat = MessagesStore.getOpenChat()
    return {
      friends,
      openChat,
    }
  }
  componentWillMount() {
    FriendshipsStore.onChange(this.onStoreChange.bind(this))
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    FriendshipsStore.offChange(this.onStoreChange.bind(this))
    MessagesStore.offChange(this.onStoreChange.bind(this))
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
    const openChat = this.state.openChat
    const friends = this.state.friends.map((friend, index) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'user-list__item--active': (friend.id === openChat.to_user_id) || (friend.id === openChat.from_user_id),
        'clear': true,
      })
      const avatar = (friend.avatar.url === null) ? 'default_image.jpg' : friend.avatar.url
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
            <img src={ avatar } />
          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { friend.name }
            </h4>
          </div>
        </li>
      )
    })

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
