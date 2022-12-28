import _ from 'lodash'

export function fillArray(n: number) {
  return _.fill(Array(n), '').map((x, i) => i)
}

export function scrollIntoView(id: string, option?: ScrollIntoViewOptions) {
  const element = document.getElementById(id)
  if (element) {
    // 👇 Will scroll smoothly to the top of the next section
    element.scrollIntoView({
      behavior: 'smooth',
      ...option,
    })
  }
}
