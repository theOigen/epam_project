/* eslint-disable space-before-function-paren */
export default {
  getDateFromSeconds(seconds) {
    const date = new Date(1970, 0, 1)
    date.setSeconds(seconds)
    return date
  }
}
