import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT: null,
  SEND_MESSAGE: null,
  SEARCH_USERS: null,
  GET_CURRENT_USER: null,
  GET_FRIENDS: null,
})

// CSRFを防ぐためのセキュリティ
export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

// apiの共通のurlを定数化
const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS_SEARCH: APIRoot + '/users/search',
  CURRENT_USER: APIRoot + '/users/current',
  FRIENDS: APIRoot + '/users/friends',
}
