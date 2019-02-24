import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Search from '../components/users/search'
import Header from '../components/messages/header'

export default class UserRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateSearch)
    this.route('/users/:id', this.decorateHeader)
    this.route('/users/edit', this.decorateHeader)
  }

  decorateSearch(ctx, next) {
    (new ReactDecorator()).decorate('react-main', Search)
    next()
  }
    decorateHeader(ctx, next) {
      (new ReactDecorator()).decorate('react-header', Header)
      next()
    }
}
