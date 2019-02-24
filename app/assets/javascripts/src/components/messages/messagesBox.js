import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UserStore from '../../stores/users'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const friendMessages = MessagesStore.getFriendMessages()
    const openChat = MessagesStore.getOpenChat()
    const currentUser = UserStore.getCurrentUser()
    return {
      friendMessages,
      openChat,
      currentUser,
    }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    const currentUser = this.state.currentUser
    const messages = this.state.friendMessages.map((message, index) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === currentUser.id,
        'clear': true,
      })
      return (
          <li key={ message.created_at + '-' + message.user_id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              {message.image ? <img className='image-message' src={message.image.url} /> : message.text}
            </div>
          </li>
        )
    })

    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default MessagesBox
