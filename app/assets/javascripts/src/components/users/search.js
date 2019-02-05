import React from 'react'
import Header from '../messages/header'
import SearchForm from './searchForm'
import SearchUserList from './searchUserList'

class Search extends React.Component {
  render() {
    return (
        <div className='search'>
          <Header />
          <div className='chatapp-logo'>
            <span className='google logo-C'>C</span>
            <span className='google logo-h'>h</span>
            <span className='google logo-a'>a</span>
            <span className='google logo-t'>t</span>
            <span className='google logo-A'>A</span>
            <span className='google logo-p'>p</span>
            <span className='google logo-p2'>p</span>
          </div>
          <SearchForm />
          <SearchUserList />
        </div>
      )
  }
}

export default Search
