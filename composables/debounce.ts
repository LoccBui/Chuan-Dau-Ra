import _ from "lodash"

export const useDebounce: any = (func: Function, delay = 500) => {
  return _.debounce((...args) => {
    func(...args)
  }, delay)
}
