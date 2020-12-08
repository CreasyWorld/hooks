/**
 * 获取默认的请求headers
 * @param method 请求类型，[GET，POST]
 */
export const getDefaultHeaders = (method: string) => {
  let headers = { Accept: 'application/json' }
  if (method !== 'GET') {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}
