import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
    // const openChat = MessagesStore.getOpenChat()
    // return {
    //   value: '',
    //   openChat, // FriendshipsStore.getFriendshipID(),
    // }
  }
  getStateFromStore() {
    console.log('ReplyBox : getStateFromStore')
    const openChat = MessagesStore.getOpenChat()
    const openChatID = openChat.id
    return {
      value: '',
      openChatID,
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
  handleKeyDown(e) {
    const friendshipID = this.state.openChatID
    if (e.keyCode === 13) {
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      MessagesAction.sendMessage(friendshipID, this.state.value)
      this.setState({
        value: '',
      })
    }
  }
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
