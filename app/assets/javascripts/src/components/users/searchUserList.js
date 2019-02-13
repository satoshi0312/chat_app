import React from 'react'
import UsersStore from '../../stores/users'
import $ from '../../vendor/jquery'
import {CSRFToken} from '../../constants/app'

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
  createFriendship(toUserID) {
    console.log(toUserID)

    var $form = $('<form></form>')
    $form.attr({
      'method': 'post',
      'action': '/friendships',
    })

    var $csrfInput = $('<input></input>')
    $csrfInput.attr({
      'name': 'authenticity_token',
      'value': CSRFToken(),
    })

    var $toUserIDInput = $('<input></input>')
    $toUserIDInput.attr({
      'name': 'to_user_id',
      'value': toUserID,
    })

    $form.append($csrfInput)
    $form.append($toUserIDInput)
    $('body').append($form)
    $form.submit()
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <li
          onClick={ this.createFriendship.bind(this, user.id)}
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
