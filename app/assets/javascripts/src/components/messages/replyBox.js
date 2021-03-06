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
  }
  getStateFromStore() {
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
  uploadImage(e) {
    const friendshipID = this.state.openChatID
    if (e.target.files.length === 0) return
    var file = e.target.files[0]
    MessagesAction.sendImage(friendshipID, file)
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value = { this.state.value }
          onKeyDown = { this.handleKeyDown.bind(this) }
          onChange = { this.updateValue.bind(this) }
          className = 'reply-box__input'
          placeholder = { this.state.openChatID ? 'Type message to reply..' : 'Select friend to bigin a chat with..' }
          disabled = { this.state.openChatID ? '' : 'disabled' }
        />
        <span className = 'reply-box__tip'>
          Press <span className = 'reply-box__tip__button'>Enter</span> to send
        </span>
        <div className='reply-box__image'>
          <input
            type = 'file'
            onChange = { this.uploadImage.bind(this) }
            className = 'image-select-btn'
            disabled = { this.state.openChatID ? '' : 'disabled' }
          />
        </div>
      </div>
    )
  }
}

export default ReplyBox
