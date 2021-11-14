import jwtDecode from 'jwt-decode'
import UniversalCookie from 'universal-cookie'
var cookieparser = require('cookieparser')

export function getUserFromCookie (app) {
    const cookie = new UniversalCookie()
    const userCookies = cookie.get('access_token')

  if (process.server && process.static) return
  if (!userCookies) return

  // if (userCookies) {
    // const parsed = cookieparser.parse(userCookies)
    // console.log(parsed)
    // const accessTokenCookie = parsed.access_token
    // console.log(accessTokenCookie)
    // if (!accessTokenCookie) return '3'

    const decodedToken = jwtDecode(userCookies)
    if (!decodedToken) return

    return decodedToken
  // }
}

