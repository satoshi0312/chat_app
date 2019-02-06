import React from 'react'

class SearchUserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }

  render() {
    return (
      <ul className='search_user_list'>
        <li className='search_user_list_item'>
          <div className='search_user_list_result'>
            <img className='search_user_list_result_image' src='/Users/satoshi/progate/flux_tutorial/app/assets/images/default_image.jpg'/>
            <span>user1</span>
          </div>
        </li>
      </ul>
    )
  }
}

export default SearchUserList
