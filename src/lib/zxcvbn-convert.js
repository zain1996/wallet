import toIdentifier from 'text-to-js-identifier'

export const zxcvbnKey = toIdentifier

export function zxcvbnKeys (array) {
  return array.map(item => zxcvbnKey(item))
}

export default function (object) {
  const result = {}
  Object.keys(object).forEach(key => {
    result[zxcvbnKey(key)] = object[key]
  })
  return result
}
