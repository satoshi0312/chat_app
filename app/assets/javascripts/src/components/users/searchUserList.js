import React from 'react'
import UsersStore from '../../stores/users'

class SearchUserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      users: UsersStore.getSearchUsers(),
    }
  }
  componentWillMount() {
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    UsersStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  createFriendship(id) {
    console.log(id)
  }

  render() {
    const users = this.state.users.map((user, index) => {
      console.log(user.avatar)
      return (
          // <li key={ message.created_at + '-' + message.user_id } className={ messageClasses }>
          //   <div className='message-box__item__contents'>
          //     { message.text }
          //   </div>
          // </li>
        <li
          onClick={ this.createFriendship.bind(user.id)}
          className='search_user_list_item'
          key={user.id}
        >
          <div className='search_user_list_result'>
            <img className='search_user_list_result_image' src={user.avatar}/>
            <span>{user.name}</span>
          </div>
        </li>
      )
    })
    return (
      <ul className='search_user_list'>
        {users}
      </ul>
    )
  }
}

export default SearchUserList
