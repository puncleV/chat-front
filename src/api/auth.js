import config from '../../config'

export default class Auth {
  static async login (username) {
    return (await fetch(
      `${location.origin}${config.apiPath}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username
        }),
        credentials: 'include'
      }
    )).json()
  }

  static async checkLogin () {
    return (await fetch(
      `${location.origin}${config.apiPath}/auth/checkLogin`, {
        credentials: 'include'
      }
    )).json()
  }

  static async logout () {
    return (await fetch(
      `${location.origin}${config.apiPath}/auth/logout`, {
        credentials: 'include'
      }
    )).json()
  }
}
