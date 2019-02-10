import React from 'react'
import UsersStore from '../../stores/users'
import UsersAction from '../../actions/users'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    UsersAction.getCurrentUser()
    this.onChangeHandler = this.onStoreChange.bind(this)
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      currentUser: UsersStore.getCurrentUser(),
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
  render() {
    const currentUser = this.state.currentUser
    const currentUserName = currentUser ? currentUser.name : ''
    const currentUserPage = currentUser ? (<a href={'/users/' + currentUser.id}>マイページ</a>) : ''
    return (
        <header className='header'>
          <div className='header-left'>
            <div className='header-logo'>
              <a href='/' className='header-logo-link'>ChatApp</a>
            </div>
          </div>
          <div className='header-right'>
            <ul className='nav nav-tabs'>
              <li className='search-user-btn'>
                <a href='/users/search' className='header-logo-link'>ユーザーを探す</a>
              </li>
              <li className='dropdown'>
                <div>
                  {currentUserName}
                  <span></span>
                </div>
                <ul className='dropdown-menu user-menu-box'>
                  <li className='user-menu-list'>
                    {currentUserPage}
                  </li>
                  <li className='user-menu-list'>
                    <a href='/users/sign_out' data-method='delete'>ログアウト</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </header>
      )
  }
}

export default Header
