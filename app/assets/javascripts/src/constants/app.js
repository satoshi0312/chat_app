import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
})

//CSRFを防ぐためのセキュリティ
export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

// apiの共通のurlを定数化
const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSEGES: APIRoot + '/messages'
}
