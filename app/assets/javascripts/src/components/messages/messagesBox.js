import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import UserStore from '../../stores/users'
import MessagesAction from '../../actions/messages'
// import Utils from '../../utils'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    console.log('MessagesBox : constructor')
    console.log(this.state)
    MessagesAction.changeOpenChat()
    this.onChangeHandler = this.onStoreChange.bind(this)
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    console.log('MessagesBox : getStateFromStore')
    const friendMessages = MessagesStore.getFriendMessages()
    const openChat = MessagesStore.getOpenChat()
    const currentUser = UserStore.getCurrentUser()
    console.log(this.props)
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
    // const messagesLength = this.state.messages.length
    const currentUser = this.state.currentUser
    // if (!currentUser)
    // const openChat = this.state.openChat
    // console.log('MessagesBox: render')
    // console.log(currentUser)
    // console.log(openChat)

    const messages = this.state.friendMessages.map((message, index) => {
      console.log(message)
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === currentUser.id,
        'clear': true,
      })

      return (
          <li key={ message.created_at + '-' + message.user_id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              {message.image ? <img className='image-message' src={`/message_images/${message.image}`} /> : message.text}
            </div>
          </li>
        )
    })

    // const lastMessage = this.state.messages[messagesLength - 1]
    // if (lastMessage.user_id === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox openChat={this.state.openChat}/>,
        </div>
      )
  }
}

export default MessagesBox
