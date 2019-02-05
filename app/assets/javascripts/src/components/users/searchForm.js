import React from 'react'

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
    // MessagesAction.sendMessage(1, this.state.value)
    this.setState({
      value: e.target.value,
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
