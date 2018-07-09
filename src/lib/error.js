import { i18n } from 'plugins/i18n'

export function errorConvert (object) {
  const result = {}
  Object.keys(object).forEach(key => {
    result[`code_${key}`] = object[key]
  })
  console.log(result)
  return result
}

export default function error (errCode) {
  // backend service error code starts from 10000, subtract it for simplicity
  if (errCode >= 10000) errCode -= 10000

  const errorDict = i18n.vm.messages[i18n.locale].error // TODO: fallback locale?
  errCode = `code_${errCode}`
  if (errCode in errorDict) return i18n.t(`error.${errCode}`)
  else return i18n.t('error.code_0') // server error
}
