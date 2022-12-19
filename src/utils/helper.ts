import _ from 'lodash'

export function fillArray(n: number) {
  return _.fill(Array(n), '').map((x, i) => i)
}
