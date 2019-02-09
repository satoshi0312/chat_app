import React from 'react'
import UsersAction from '../../actions/users'

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  updateValue(e) {
    const keyword = e.target.value
    UsersAction.searchUsers(keyword)
    this.setState({
      value: keyword,
    })
  }

  render() {
    return (
      <input
        value={ this.state.value }
        onChange={ this.updateValue.bind(this) }
        className='search_form'
        placeholder='ユーザー名で検索しよう'
      />
    )
  }
}

export default SearchForm
