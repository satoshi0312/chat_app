import React from 'react'

class Header extends React.Component {
  render() {
    return (
        <header className='header'>
          <div className='header-left'>
            <div className='header-logo'>
              <a href='/'>ChatApp</a>
            </div>
          </div>
          <div className='header-right'>
            <ul className='nav nav-tabs'>
              <li className='search-user-btn'>
                <a href='ユーザーを探す' className='header-logo-link'>/users/search</a>
              </li>
              <li className='dropdown'>
                <div>
                  test
                  <span></span>
                </div>
                <ul className='dropdown-menu user-menu-box'>
                  <li className='user-menu-list'>
                    <a href='マイページ'>#</a>
                  </li>
                  <li className='user-menu-list'>
                    <a href='ログアウト'>#</a>
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
